//@ts-check
import { Hono } from 'hono';
import {
  createIntent,
  updateIntent,
  fetchAllIntents,
  fetchAllUserIntents,
  fetchIntentById,
  confirmIntent,
  cancelIntent,
  searchIntents,
  deleteIntent,
} from './intents.mjs';
const app = new Hono();

//create payment intent
app.post('/', async (c) => {
  const body = await c.req.json().catch(() => ({}));

  try {
    const data = await createIntent(body);
    return c.json(data, 201);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return c.json({ message: err.message }, 400);
    }
    if (err.name === 'DatabaseError') {
      return c.json({ message: 'An error occurred while creating the intent' }, 500);
    }
    console.error('Unexpected error:', err);
    return c.json({ message: 'An unexpected error occurred' }, 500);
  }
});

//update payment intent
// should be app.put but limitation on twilio studio
app.post('/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json().catch(() => ({}));

  try {
    const data = await updateIntent(id, body);
    return c.json(data, 200);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return c.json({ message: err.message }, 400);
    }

    if (err.name === 'DatabaseError') {
      return c.json({ message: 'An error occurred while updating the intent' }, 500);
    }

    console.error('Unexpected error:', err);
    return c.json({ message: 'An unexpected error occurred' }, 500);
  }
});

// Fetch all intents
app.get('/', async (c) => {
  try {
    const data = await fetchAllIntents();
    return c.json(data, 200);
  } catch (err) {
    if (err.name === 'DatabaseError') {
      return c.json({ message: err.message }, 500);
    }

    console.error('Unexpected error:', err);
    return c.json({ message: 'An unexpected error occurred' }, 500);
  }
});

// Fetch all user intents
app.get('/user/:from_number', async (c) => {
  const from_number = c.req.param('from_number');
  try {
    const data = await fetchAllUserIntents(from_number);
    return c.json(data, 200);
  } catch (err) {
    if (err.name === 'DatabaseError') {
      return c.json({ message: err.message }, 500);
    }

    console.error('Unexpected error:', err);
    return c.json({ message: 'An unexpected error occurred' }, 500);
  }
});

// Fetch intent by id
app.get('/:id', async (c) => {
  const id = c.req.param('id');
  try {
    const data = await fetchIntentById(id);
    return c.json(data, 200);
  } catch (err) {
    if (err.name === 'DatabaseError') {
      return c.json({ message: err.message }, 500);
    }
    console.error('Unexpected error:', err);
    return c.json({ message: 'An unexpected error occurred' }, 500);
  }
});

//confirm intent
app.post('/:id/confirm', async (c) => {
  const id = c.req.param('id');
  const { from_number } = await c.req.json().catch(() => ({}));

  if (!from_number) {
    return c.json(
      {
        message: 'Invalid request; missing `from_number`',
      },
      400,
    );
  }
  try {
    const data = await confirmIntent(id, from_number);
    return c.json(data, 200);
  } catch (err) {
    console.error('Unexpected error:', err);
    return c.json(
      {
        message: 'Unexpected error occurred',
        error: err.message,
      },
      500,
    );
  }
});

//search intent
app.post('/search', async (c) => {
  const { query } = await c.req.json().catch(() => ({}));
  try {
    const data = await searchIntents(query);
    return c.json(data, 200);
  } catch (err) {
    console.error('Unexpected error:', err);
    return c.json(
      {
        message: 'Unexpected error occurred',
        error: err.message,
      },
      500,
    );
  }
});

//delete intent
app.post('/:id/delete', async (c) => {
  const id = c.req.param('id');
  try {
    const data = await deleteIntent(id);
    return c.json('Intent deleted!', 200);
  } catch (err) {
    console.error('Unexpected error:', err);
    return c.json(
      {
        message: 'Unexpected error occurred',
        error: err.message,
      },
      500,
    );
  }
});

export default app;
