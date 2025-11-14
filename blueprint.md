
# Project Blueprint

## Overview

This project is a React application that displays a list of cars with their financing details, inspired by a design provided by the user. The application will be styled to match the visual aesthetics of the provided image, including layout, colors, and typography.

## Current Implementation

### Initial Setup

The project was initialized as a standard Vite + React project.

### Styling

*   **`index.css`**: Contains global styles and resets.
*   **`App.css`**: Contains component-specific styles.

### Components

*   **`App.jsx`**: The main application component.
*   **`Header.jsx`**: Displays the application header, including the GWM logo.
*   **`CarList.jsx`**: Renders a list of `CarItem` components.
*   **`CarItem.jsx`**: Displays information about a single car, including its name, price details, image, and financing status.
*   **`Plans.jsx`**: Renders a list of `PlanItem` components.
*   **`PlanItem.jsx`**: Displays information about a single plan, including its name, price details, and action buttons.

## Plan for Current Request

The user wants to add a new screen that appears when the "Ver planes" button is clicked. This new screen will show a list of available plans for the selected vehicle.

1.  **Install `react-router-dom`** to handle navigation between the car list and the plans screen.
2.  **Create a new `Plans` component** to display the list of plans. This component will be similar in structure to the `CarList` component.
3.  **Create a `PlanItem` component** to display the details of a single plan.
4.  **Create a new `plans.js` file** in the `src/data` folder to store the plan data.
5.  **Update the `App` component** to include the routing logic using `BrowserRouter`, `Routes`, and `Route` from `react-router-dom`.
6.  **Modify the `CarItem` component** to navigate to the `/plans` route when the "Ver planes" button is clicked, using the `useNavigate` hook from `react-router-dom`.
