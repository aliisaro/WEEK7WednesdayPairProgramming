// components
import BookDetails from "../components/BookDetails";
import BookForm from "../components/BookForm";

const booksArray = [
  {
    title: "Sample title 1",
    author: "Sample author 1",
    genre: "Sample genre 1",
  },
  {
    title: "Sample title 2",
    author: "Sample author 2",
    genre: "Sample genre 2",
  }
];


const Home = () => {
  return (
    <div className="home">
      <div className="goals">
        <BookDetails book={booksArray[0]} />
        <BookDetails book={booksArray[1]} />
      </div>
      <BookForm />
    </div>
  );
};

export default Home;
