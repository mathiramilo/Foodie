import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getRestaurants } from '../services'

const initialState = {
  items: [],
  filteredItems: [],
  selected: null,
  loading: false,
  error: null
}

export const fetchRestaurants = createAsyncThunk('restaurants/fetchRestaurants', async () => {
  const restaurantsObject = await getRestaurants()
  const restaurantsArray = Object.values(restaurantsObject)
  return restaurantsArray
})

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    filterRestaurantsByTag: (state, action) => {
      const { tag } = action.payload
      state.filteredItems = state.items.filter(restaurant => restaurant.tags.includes(tag))
    },
    filterRestaurantsBySearch: (state, action) => {
      const { search } = action.payload
      state.filteredItems = state.items.filter(restaurant =>
        restaurant.name.toLowerCase().includes(search.toLowerCase())
      )
    },
    selectRestaurant: (state, action) => {
      state.selected = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchRestaurants.pending, state => {
      state.loading = true
    }),
      builder.addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.items = action.payload
        state.filteredItems = action.payload
        state.loading = false
      }),
      builder.addCase(fetchRestaurants.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
      })
  }
})

export const { filterRestaurantsByTag, filterRestaurantsBySearch, selectRestaurant } = restaurantsSlice.actions

export default restaurantsSlice.reducer