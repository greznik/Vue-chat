import { state } from "../store";

export default function({ store, redirect }) {
  if (!Object.keys(store.state.user).length) {
    redirect("/?message=noUser");
  }
}
