import { createSlice } from '@reduxjs/toolkit'
import { AppState } from './Store'
import { HYDRATE } from 'next-redux-wrapper'

// Type for our state
export type DragNDropState = {
    isDragging: boolean
    hoveredCoordinates: string | null
}

// Initial state
const initialState: DragNDropState = {
    isDragging: false,
    hoveredCoordinates: null,
}

// Actual Slice
export const dragNDropSlice = createSlice({
    name: 'dragNDrop',
    initialState,
    reducers: {
        // Action to set the dragNDropentication status
        setDragNDropState(state, action) {
            state.isDragging = action.payload.isDragging
            state.hoveredCoordinates = action.payload.hoveredCoordinates
        },
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.isDragging,
                ...action.payload.hoveredCoordinates,
            }
        },
    },
})

export const { setDragNDropState } = dragNDropSlice.actions

export const selectDragNDropState = (state: AppState) => state.dragNDrop

export default dragNDropSlice.reducer
