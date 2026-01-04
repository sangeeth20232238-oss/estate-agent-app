import { render, screen } from '@testing-library/react';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

// We must "Mock" the Drag-and-Drop system because it doesn't work in a test console
jest.mock('react-dnd', () => ({
  DndProvider: ({ children }) => <div>{children}</div>,
  useDrag: () => [{ isDragging: false }, () => {}],
  useDrop: () => [{ isOver: false }, () => {}],
}));
jest.mock('react-dnd-html5-backend', () => ({
  HTML5Backend: {},
}));

// Helper to render App with the Router wrapper
const renderApp = () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

// TEST 1: The "Smoke Test" (Does it crash?)
test('renders the main app without crashing', () => {
  renderApp();
  // If the app crashes, this test fails automatically.
  // If it renders, we look for the main header text.
  const linkElement = screen.getByText(/Find Your Dream Home/i);
  expect(linkElement).toBeInTheDocument();
});

// TEST 2: Check Search functionality inputs
test('renders search filters correctly', () => {
  renderApp();
  // Check if the "Type" dropdown exists
  const typeLabel = screen.getByText(/Type/i);
  expect(typeLabel).toBeInTheDocument();
  
  // Check if the "Search" button exists
  const searchButton = screen.getByRole('button', { name: /Search/i });
  expect(searchButton).toBeInTheDocument();
});

// TEST 3: Check Favourites Panel (Integration Test)
test('renders the favourites panel correctly', () => {
  renderApp();
  // Check title
  const favTitle = screen.getByText(/My Favourites/i);
  expect(favTitle).toBeInTheDocument();
  
  // Check it asks for drag and drop (Empty state)
  const emptyMessage = screen.getByText(/Drag properties here/i);
  expect(emptyMessage).toBeInTheDocument();
});

// TEST 4: Check Properties Gallery Area
test('renders the property grid area', () => {
  renderApp();
  // Initially, it might show 0 or 7 properties depending on fetch speed.
  // We check if the container for properties exists by looking for the heading or structure.
  const galleryText = screen.getByText(/Properties Found/i);
  expect(galleryText).toBeInTheDocument();
});

// TEST 5: Check Price Range Inputs (The Replacement Test)
test('renders price range inputs', () => {
  renderApp();
  // We look for the input that says "Min" inside it
  const minPrice = screen.getByPlaceholderText(/Min/i);
  expect(minPrice).toBeInTheDocument();
});