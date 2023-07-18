# Covid Connect

The `Covid Connect` is an MVP, for now it only have the `CovidTracker` component is a React component that displays global COVID-19 statistics. It fetches data from the [disease.sh](https://disease.sh/) API and provides a search functionality to view statistics for specific countries.

## Props

The `CovidTracker` component does not accept any props.

## Usage

To use the `CovidTracker` component, follow these steps:

```jsx
import CovidTracker from './CovidTracker';

const App = () => {
  return (
    <div>
      <CovidTracker />
    </div>
  );
};

export default App;
