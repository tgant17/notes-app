const chalk = require('chalk')
const validator = require('validator')
const yargs = require('yargs')
const notes = require('./notes.js')

//customize yargs version
yargs.version('1.1.0')

//create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: 
    {
        title: 
        {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        },

        body:
        {
            describe: 'the body of the note',
            demandOption: true,
            type: 'string' 
        }
    },
    handler(argv) 
    {
        notes.addNote(argv.title, argv.body)
    }
})

//create remove command 
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: 
    {
        title: 
        {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv)
    {
        notes.removeNote(argv.title)
    }
})

//create a list 
yargs.command({
    command: 'list',
    describe: 'list all notes',
    handler()
    {
        notes.listNotes()
    }
})

//reads a note
yargs.command({
    command: 'read',
    describe: 'reads a note',
    builder:
    {
        title: 
        {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv)
    {
        notes.readNote(argv.title)
    }
})



yargs.parse()