import Papa from "papaparse";
import Blob from "blob";
import FileSaver from "file-saver";

export default {
  readAndParseFile({ commit, state }) {
      state.loader=true;
      console.log("state",state);
    const fileToLoad = state.selectedFile;
    if (!fileToLoad) return;
    const reader = new FileReader();
    reader.onload = fileLoadedEvent => {
        state.loader=true;
      Papa.parse(fileLoadedEvent.target.result, {
        header: true,
        complete(results) {
          console.log("complete", results);
          commit("afterParse", results);
        },
        error(errors) {
          console.log("error", errors);
        }
      });
    };
    reader.readAsText(fileToLoad);
      state.loader=false;
  },
  save({ state }) {
    state.loader= true;
    const blob = new Blob([Papa.unparse(state.data)], { type: "text/csv" });
    FileSaver.saveAs(blob, "test.csv");
    state.loader=false;
  }
};
