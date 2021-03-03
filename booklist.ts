// Book class: Represent a book

class Book {

    title : string;

    author: string;

    isbn: string;

    constructor(title : string, author : string, isbn: string){

        this.title = title;
        this.author = author;
        this.isbn = isbn;
        


    }
}

// UI class: Handle UI tasks

class UI {
    //static addBookToList: any;
    static displayBooks(){
        // const StoredBooks = [
        //     {
        //         title:'Book One',
        //         author:'Samartha Ramdas',
        //         isbn : '123456'
        //     },
        //     {
        //         title:'Book Two',
        //         author:'V D Savarkar',
        //         isbn : '987124'
        //     },
        // ]

        const books = Store.getBooks();

        books.forEach((book: any) => UI.addBookToList(book));
    }


    static addBookToList(book: any) {
    //     throw new Error("Method not implemented.");
    const list = document.querySelector('#book-list')!;

    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `

    list.appendChild(row);

    }
    
    static deleteBook (el:any) {
        if(el.classList.contains('delete')){
            (el.parentElement)!.parentElement!.remove();
        }

    }

    //bootstrap working

    //<div class="alert alert-sucess">Whatever the Message</div>

    static showAlert(message: any, className: any) {
        const div = document.createElement('div');

        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container =document.querySelector('.container')!;
        const form = document.querySelector('#book-form')! as HTMLElement;
        container.insertBefore(div,form);

        // remove alert message after few seconds

        setTimeout(()=> document.querySelector('.alert')!.remove(), 3000);

    }



    static clearFields() {
        (document.querySelector('#title')! as HTMLInputElement).value = '';
        (document.querySelector('#author')! as HTMLInputElement).value = '';
        (document.querySelector('#isbn')! as HTMLInputElement).value = '';
    }


}

// store Class : Local Storage 

class Store{
    static getBooks(){
        let books;

        if(localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books')!);
        } 

        return books;
    }


    static addBook(book:any) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn: any){
        const books:Array<any> = Store.getBooks();
        
        
        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index,1);
            }
            
        });
        
        localStorage.setItem('books' , JSON.stringify(books));
        
    }
}

// Event : Dispaly books

document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event : Add a book

var addBook = document.querySelector('#book-form')! as HTMLInputElement

addBook.addEventListener('submit', (e) => {

    // prevent actual submit

    e.preventDefault();
    const title = (document.querySelector('#title')! as HTMLInputElement).value;
    const author = (document.querySelector('#author')! as HTMLInputElement).value;
    const isbn = (document.querySelector('#isbn')! as HTMLInputElement).value;


    // validate input

    if(title === '' || author === '' || isbn === ''){
        UI.showAlert('Please enter all fields', 'danger');
    } else{
        
    // instantiate book

        const book = new Book(title, author, isbn);
        console.log(book);

        // add book, title , isbn to UI

        UI.addBookToList(book);

        // Add book to store

        Store.addBook(book);

        //completion message
        UI.showAlert('Book Added' , 'success'); 

        // clear input values

        UI.clearFields();

    }
})

// Event : Remove a Book

var removeBook = document.querySelector('#book-list')! as HTMLInputElement
removeBook.addEventListener('click' , (e)=>{
    //console.log(e.target)
    UI.deleteBook(e.target)!;

    //remove book from store
    // const removingLocalStorage = (e.target)!
    // Store.removeBook(removingLocalStorage.value())

    //Remove book message 

    UI.showAlert('Book Removed' , 'success');
})


















