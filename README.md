<h1 id="title">Mapon</h1>

## Description

- Using the Mapon API and the Google Maps API, the map must
  show the route taken by the car.
- The user must be able to select a car from the list of
  available cars and the time period (days).
- After confirming the selected car and period, a map with
  the route must be displayed.

<h2>🚀 Demo</h2>

[https://ilyashenkoa.github.io/Mapon/](https://ilyashenkoa.github.io/Mapon/)

<h2>Project Screenshots:</h2>

<img src="https://user-images.githubusercontent.com/12977611/197500025-c2abad62-4ec1-4af4-b5b6-4048324e68a1.png" alt="project-screenshot" width="700" />

### Skelton loading if any error occur with map loading
<img src="https://user-images.githubusercontent.com/12977611/197500097-473c75b3-042e-4521-a7ab-e6f3bd738f6f.png" alt="project-screenshot" width="700" />

### Route is not visible and data are not valid, because Direction API was not enabled due to "pay-as-you-go pricing model"
<img src="https://user-images.githubusercontent.com/12977611/197500369-7a92c66c-4de5-4b9b-ba62-1a53627bbea0.png" alt="project-screenshot" width="700" />

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone the repository</p>

```
git clone https://github.com/IlyashenkoA/react-quiz.git
```

<p>2. Install all packages</p>

```
npm install
```

<p>3. Add .env file and keys for: 
<ul>
<li>Mapon API - REACT_APP_MAPON_API</li>
<li>Google Map API - REACT_APP_GOOGLE_API</li>
</ul>
</p>

<p>4. Run the project</p>

```
npm run start
```

  
  
<h2>💻 Built with</h2>

Technologies used in the project:

*   HTML5
*   SASS
*   TypeScript
*   React
*   Redux
*   Redux Thunk

Libraries:

*   react-google-maps/api
*   react-loading-skeleton
*   react-hook-form
*   axios
*   dotenv
