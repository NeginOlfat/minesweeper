import { configureStore } from "@reduxjs/toolkit";
import reducer from "../reducers/reducer";

export default configureStore({
    reducer: {
        reducer
    }
});
