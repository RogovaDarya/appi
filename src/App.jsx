import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './routes/Login';
import Home from './routes/Home';
import RequireAuth from './components/RequireAuth';
import SignUp from './routes/SignUp';
import Layout from './routes/Layout';
import ErrorPage from './routes/ErrorPage';
import { noteLoader } from './utils/loaders';
import Notes from './routes/Notes';
import CreateNote from './routes/CreateNote';
import EditNote from './routes/EditNote';
import NoteView from './routes/NoteView';
import { Provider } from 'react-redux';
import store, { persistor } from './redux';
import { PersistGate } from 'redux-persist/integration/react';

const router = createBrowserRouter([
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/notes',
        element: <Notes />,
      },
      {
        path: 'createnote',
        element: <CreateNote />,
      },
      {
        path: '/editnote/:id',
        loader: noteLoader,
        element: <EditNote />,
      },
      {
        path: '/notes/:id',
        loader: noteLoader,
        element: <NoteView />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
