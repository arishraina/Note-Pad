const btnE1 = document.getElementById("btn")
const webE1 = document.getElementById("web")
getNotes().forEach((note)=>{
    const noteE1 = createNoteE1(note.id,note.content);
    webE1.insertBefore(noteE1,btnE1);
});
let notes = [];
function createNoteE1(id,content){
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.placeholder = "Empty Note";
    element.value = content;
    element.addEventListener("dblclick",()=>{
        const warning = confirm("Do You Want to Delete This Note?");
        if(warning){
            deleteNote(id,element)
        }
    });
    element.addEventListener("input",()=>{
        updateNote(id,element.value);
    });

    return element;
}
function deleteNote(id,element){
    notes =getNotes().filter((note)=> note.id!=id);
    saveNote(notes);
    webE1.removeChild(element);
}
function updateNote(id,content){
    const notes = getNotes();
    const target =notes.filter((note)=> note.id!=id)[0];
    target.content = content;
    saveNote(notes);
}
function addNote(){
    const notes =getNotes();
    const noteObj = {
        id: Math.floor(Math.random() * 10000),
        content: ""
    };
    const noteE1= createNoteE1(noteObj.content);
    webE1.insertBefore(noteE1,btnE1);
    notes.push(noteObj);
    saveNote(notes)
}
function saveNote(notes){
    localStorage.setItem("note-web",JSON.stringify(notes));
}
function getNotes(){
    return JSON.parse(localStorage.getItem("note-web") ||"[]");
}
btnE1.addEventListener("click",addNote);