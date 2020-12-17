const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => 'your notes'


const addNote = (title, body) =>
{
    const notes = loadNotes()

    const duplicateNotes = notes.find((note) => note.title === title)

    if(!duplicateNotes)
    {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.inverse.green('New note added!'))
    }
    else console.log(chalk.inverse.red('Note title already exists'))


}

const saveNotes = (notes) =>
{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () =>
{
    try 
    {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(e)
    {
        return [] 
    }
}

const removeNote = (title) =>
{
    const notes = loadNotes() //sets a list of all the notes object to a variable

    const duplicateNotes = notes.filter((note) => note.title === title)



    if(duplicateNotes.length === 0)
    {
        console.log(chalk.inverse.red("There is no note called " + title + " to remove"))
    }
    else 
    {
        const notesToKeep = notes.filter((note) => note.title !== title)
    
        saveNotes(notesToKeep)
        console.log(chalk.inverse.green("Title: " + title + " has been removed"))
    }
}

const listNotes = () => 
{
    const notes = loadNotes()

    console.log(chalk.inverse('  Your notes...'))

    notes.forEach((note) => console.log(note.title))
}

const readNote = (title) =>
{
    const notes = loadNotes()

    const lookForNote = notes.find((note) => note.title === title)

    if(lookForNote) //note found 
    {
        console.log(chalk.inverse.green('Note found!'))
        console.log('\t' + chalk.inverse(lookForNote.title ))
        console.log('\t' + lookForNote.body)
    }
    else 
    {
        console.log(chalk.inverse.red('Note not found'))
    }
}

module.exports = 
{
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}