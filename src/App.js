import './App.css';
import AppContainer from './components/AppContainer'
import Helmet from "react-helmet";

function App() {
  
  return (
    <div className="App">
      <Helmet>
        {/* <!-- HTML Meta Tags --> */}
        <title>League of Legends Ability Quiz</title>
        <meta
          name="description"
          content="Test your knowlege to guess an ability based on its picture, with up to 1000 questions featuring abilities from Riot Games' League of Legends."
        />

        {/* <!-- Google / Search Engine Tags --> */}
        <meta itemprop="name" content="Reed" />
        <meta
          itemprop="description"
          content="Test your knowlege to guess an ability based on its picture, with up to 1000 questions featuring abilities from Riot Games' League of Legends."
        />
        <meta
          itemprop="image"
          content="./Logo.png"
        />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="www.leagueabilityquiz.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="League Ability Quiz" />
        <meta
          property="og:description"
          content="Test your knowlege to guess an ability based on its picture, with up to 1000 questions featuring abilities from Riot Games' League of Legends."
        />
        <meta
          property="og:image"
          content="./background.jpg"
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="League Ability Quiz" />
        <meta
          name="twitter:description"
          content="Test your knowlege to guess an ability based on its picture, with up to 1000 questions featuring abilities from Riot Games' League of Legends."
        />
        <meta
          name="twitter:image"
          content="./background.jpg"
        />
      </Helmet>
      <AppContainer />
    </div>
  );
}

export default App;
