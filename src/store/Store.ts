import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { dragNDropSlice } from './DragNDropSlice'
import { createWrapper } from 'next-redux-wrapper'

const makeStore = () =>
    configureStore({
        reducer: {
            [dragNDropSlice.name]: dragNDropSlice.reducer,
        },
        devTools: true,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>

export const wrapper = createWrapper<AppStore>(makeStore)
