import { setIsLogged } from "@/features/app/app.slice";
import { storage } from "@/lib/storage.util";
import { Action, Dispatch } from "@reduxjs/toolkit"
export const customMiddleware =
  ({ dispatch, }: { dispatch: Dispatch<Action> }) =>
    (next: (arg0: any) => void) => (action: any) => {
      if (action.payload) {
        const { message } = action?.payload || {};
        if (message) {
          if (["Session Expired", "Unauthorized", "Invalid refresh token", "No access token", "Invalid access token format or signature", "User not found"].includes(message)) {
            dispatch(setIsLogged(false));
            storage.clear();
            window.location.replace("/login");
            return;
          }
        }
      }
      next(action);
    }