import express from 'express';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { 
    deleteTable, 
    getTableNames, 
    createTable, 
    loadPreviousData, 
    passAlldata, 
    storeData, 
    summarizer, 
    tableName,
    setTableName,
    formatText
} from './functions.js';

const router = express.Router();

// Endpoint to change the table name
router.post('/changeTable', (req, res) => {
    let changedTableName = req.body.tableName;
    setTableName(changedTableName); // Use the setter function
    return res.json({ res: tableName, status: true });
});

// Endpoint to get the current table name
router.get('/currentTable', (req, res) => {
    console.log(tableName);
    return res.json({ res: tableName });
});

// Endpoint to create a new chat table
router.post('/newchat', (req, res) => {
    let name = req.body.name;
    createTable(name);
    return res.json({ res: `Table created: ${name}` });
});

// Endpoint to get all table names
router.get('/getprev/tables', (req, res) => {
    getTableNames((err, tableNames) => {
        if (err) {
            console.error("Error:", err);
            return res.status(500).json({ error: 'Failed to fetch table names.' });
        } else {
            console.log("Table names:", tableNames);
            return res.status(200).json(tableNames);
        }
    });
});

// Endpoint to fetch all previous conversations
router.get('/getprev', (req, res) => {
    loadPreviousData((err, data) => {
        if (err) {
            console.error("Error:", err);
            return res.status(500).json({ error: 'Failed to load previous data.' });
        } else {
            return res.status(200).json(data);
        }
    });
});

// Basic endpoint to serve the main page
router.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Endpoint to delete a table
router.post('/deleteTable', (req, res) => {
    let tableName = req.body.tableName;
    deleteTable(tableName); // Function to delete table
    return res.json({ res: `Table deleted: ${tableName}` });
});

// Endpoint for immediate bot response
router.post('/response', async (req, res) => {
    try {
        let prompt = req.body.prompt;
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        let newPrompt = await passAlldata();
        let chat = newPrompt + `\nYou:${prompt}\nJARVIS: `;
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(chat);
        const response = await result.response;
        const text = await response.text();
        storeData(prompt, text, summarizer(prompt)); // Store conversation data

        const jsonResponse = {
            response: formatText(text) // Format response text
        };

        res.status(200).json(jsonResponse); // Send JSON response
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export {router as userAppRouter}
