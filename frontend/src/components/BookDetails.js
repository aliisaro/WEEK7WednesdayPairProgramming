const BookDetails = ({ book }) => {
  return (
    <div className="book-details">
      <h4>{book.title}</h4>
      <p>Author: {book.author}<br />
      Genre: {book.genre}
      </p>
      <span className="material-symbols-outlined">delete</span>
    </div>
  );
};

export default BookDetails;
