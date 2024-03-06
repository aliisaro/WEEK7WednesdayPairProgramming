import { useBook } from "../hooks/useBook";
import useField from "../hooks/useField";

const BookForm = ({ setbooksData }) => {
  const apiUrl = "http://localhost:4000/api/books";
  const titleInput = useField("");
  const title = titleInput.value;
  const authorInput = useField("");
  const author = authorInput.value;
  const genreInput = useField("");
  const genre = genreInput.value;
  const user = sessionStorage.getItem("email");
  const { handlebooks } = useBook({
    title,
    author,
    genre,
    user,
  });

  return (
    <form className="create" onSubmit={handlebooks}>
      <h3>Add a New Book</h3>

      <label>Title:</label>
      <input placeholder="write here" type="text" className="" {...titleInput}/>
      <label>Author:</label>
      <input placeholder="write here" type="text" className="" {...authorInput}/>
      <label>Genre:</label>
      <input placeholder="write here" type="text" className="" {...genreInput}/>
      <button>Add Book</button>
    </form>
  );
};

export default BookForm;
