import React, { useEffect } from "react";
import { loadNotes } from "../actions/noteActions";
import NotePost from "./NotePostView"
import { connect, Provider } from "react-redux";
import store from "../store";

const Feed = (props) => {
    
      const title = "My first Note";
      const text = "This is my first note";
      const description = "This is the description";

      const title2 = "My second note";
      const text2 = "This is my second note";
      const description2 = "Im describing my note";

    // TODO: Create action loadNotes (and the rest of the workflow)
    useEffect(() => {
        const loadedNotes = loadNotes();
    }, [])

    const feedLayout = {
        display: 'grid',
        gridTemplateColumns: '300px 1fr 440px 1fr 300px'
    }

    const feedLayout1 = {
        marginLeft: "420px",
        marginRight: "420px"
    }

    const feedPost = {
        gridColumn: '3'
    }

    

    return (
        <Provider store={store}>    
            <div style={feedLayout1}>
                <div> {/* TODO: Map function to load all notes into this column */}
                    <NotePost title={title} text={text} description={description} />
                    <NotePost title={title2} text={text2} description={description2} />
                </div>
            </div>
        </Provider>
    )
}

const mapStateToProps = state => ({
        notes: state.notes
    })

export default connect(mapStateToProps, { loadNotes })(Feed);