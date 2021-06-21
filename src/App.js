import { useSelector } from 'react-redux';
import './App.css';
import Apploader from './components/apploader';
import Searchbar from './components/searchbar';
import SearchResults from './components/searchresults';

function App() {

  const apploader = useSelector(({ app }) => app.loader);

  return (
    <div className="App">
      {apploader ?
        <Apploader />
      : null}
      <Searchbar />
      <SearchResults />
    </div>
  );
}

export default App;
