import { AppState } from './Store'
import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import Piece from '../Pieces/Piece'

// Type for our state
export type DragNDropState = {
    isDragging: boolean
    hoveredCoordinates: string | null
    piece: Piece | null
}

// Initial state
const initialState: DragNDropState = {
    isDragging: false,
    hoveredCoordinates: null,
    piece: null,
}

// Actual Slice
export const dragNDropSlice: any = createSlice({
    name: 'dragNDrop',
    initialState,
    reducers: {
        // Action to set the dragNDropentication status
        setDragNDropState(state, action) {
            state.isDragging = action.payload.isDragging
            state.hoveredCoordinates = action.payload.hoveredCoordinates
            state.piece = action.payload.piece
        },
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.isDragging,
                ...action.payload.hoveredCoordinates,
                ...action.payload.piece,
            }
        },
    },
})

export const { setDragNDropState } = dragNDropSlice.actions

export const selectDragNDropState = (state: AppState) => state.dragNDrop

export default dragNDropSlice.reducer
