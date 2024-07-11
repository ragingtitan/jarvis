import showdown from 'showdown';
export let tableName;
import con from '../connector.mjs'
export function deleteTable(tableName) {
    con.connect((err) => {
        if (err) {
            console.log(err);
        } else {
            //console.log("Connected to the database");
            let query = `DROP TABLE IF EXISTS ${tableName};`;
            con.query(query, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    //console.log(result);
                }
            });
        }
    });
}

export function renameTable(tableName,newTableName) 
{
    con.connect((err) => {
        if (err) {
            console.log(err);
        } else {
            //console.log("Connected to the database");
            let query = `ALTER TABLE ${tableName} RENAME TO ${newTableName};`;
            con.query(query, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    //console.log(result);
                }
            });
        }
    });
}



export function getTableNames(callback) 
{
    con.connect((err) => {
        if (err) {
            callback(err, null);
        } else {
            //console.log("Connected to the database");
            let query = `SHOW TABLES;`;
            con.query(query, (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    //console.log(result);
                    const tableNames = result.map(row => Object.values(row)[0]);
                    callback(null, tableNames);
                }
            });
        }
    });
}




// Example usage:
export function highlightSyntax(code) {
    if (code.startsWith('```') && code.endsWith('```')) {
        // Define regular expressions for different token types
        const keywordRegex = /\b(class|function|if|else|for|while|return)\b/g;
        const commentRegex = /\/\/.*|\/\*[\s\S]*?\*\//g;
        const stringRegex = /(["'])(?:(?=(\\?))\2.)*?\1/g;
        const numberRegex = /\b\d+(\.\d+)?\b/g;
        const operatorRegex = /[\+\-\*\/=<>]/g;
        const builtinRegex = /\b(console|print|printf)\b/g;
        const punctuationRegex = /[\(\){}\[\];,:]/g;

        // Apply syntax highlighting using spans with appropriate classes
        code = code.replace(keywordRegex, '<span class="keyword">$&</span>');
        code = code.replace(commentRegex, '<span class="comment">$&</span>');
        code = code.replace(stringRegex, '<span class="string">$&</span>');
        code = code.replace(numberRegex, '<span class="number">$&</span>');
        code = code.replace(operatorRegex, '<span class="operator">$&</span>');
        code = code.replace(builtinRegex, '<span class="builtin">$&</span>');
        code = code.replace(punctuationRegex, '<span class="punctuation">$&</span>');

        return code;
    }
    return code;
}



//This function converts markdown syntax to normal text format

export function formatText(text) {
    const converter = new showdown.Converter();
    const html = converter.makeHtml(text);
    return html;
}


//This function stores the requested data in the database.
export function storeData(prompt,response,sidebardata)
{
    con.connect((err)=>{
        if(err) throw err;
        else{
            //console.log("Connected to the database");
            let query=`INSERT INTO ${tableName}(prompt,response,sidebardata) values(?,?,?)`
            con.query(query, [prompt,response,sidebardata], (err, result)=>{
                if(err) throw err;
                else{
                    //console.log(result);
                }
            })
        }
    })
}



//This function provides the summary to be shown in the sidebar
export function summarizer(text) {
    // Split the string into an array of words
    const words = text.trim().split(/\s+/);
    
    // Extract the first four words
    const firstFourWords = words.slice(0, 4).join(' ');
    
    return firstFourWords;
}



//This function fetches all the previous conversations in the chat
export function loadPreviousData(callback) {
    con.connect((err) => {
        if (err) {
            callback(err, null);
        } else {
            //console.log("Connected to the database");
            let query = `SELECT * FROM ${tableName}`;
            con.query(query, (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    //console.log(result);
                    const data = result.map(item => ({
                        prompt: item.prompt,
                        response: formatText(item.response),
                        sidebardata: item.sidebardata
                    }));
                    callback(null, data);
                }
            });
        }
    });
}


//This function gathers all the previous conversations to be passed to the bot inorder to give context
export async function passAlldata() {
    let data = '';
    try {
        await new Promise((resolve, reject) => {
            con.connect((err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log("Connected to the database");
                    resolve();
                }
            });
        });

        const query = `SELECT * FROM ${tableName}`;
        const result = await new Promise((resolve, reject) => {
            con.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        result.forEach((element) => {
            data += `You: ${'\n'+element.prompt+'\n'} JARVIS: ${'\n'+element.response+'\n'}`;
        });

        return data;
    } catch (error) {
        console.error("Error:", error);
        return ''; // Return empty string in case of error
    }
}



export function createTable(name) {
    con.connect((err) => {
        if (err) throw err;
        
        const query = `CREATE TABLE ${name} (prompt VARCHAR(3000), response VARCHAR(4000), sidebardata VARCHAR(100))`;
        
        con.query(query, (err, result) => {
            if (err) throw err;
            
            console.log(`Table ${name} created successfully`);
        });
    });
    tableName=name;
}

export function setTableName(name) {
    tableName = name;
}
// module.exports = {
//     deleteTable,
//     renameTable,
//     getTableNames,
//     highlightSyntax,
//     formatText,
//     storeData,
//     summarizer,
//     loadPreviousData,
//     passAlldata,
//     createTable
// };