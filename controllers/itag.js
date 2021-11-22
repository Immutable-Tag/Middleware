import {v4 as uuidv4} from "uuid";

let tags = []
/*
let tags = [
    {
        "repository_url": "https://github.com/airbnb/javascript",
        "tag_id": "release 1.0",
        "commit_id": "d8cb40",
        "id": "a43e33c5-ba77-48ee-8e2f-9fee4d004751",
        "message": ""
    }
]

 */

export const getTags = (req, res) => {

    //res.send('Hello')
    res.send(tags)
}

export const createTag = (req, res) => {
    const tag = req.body;
    tags.push({...tag, id: uuidv4()});
    // Github Integration here.
    /*
    githubrepo.open("", "airbnb/javascript", function (err, data) {
        if (err) throw err;

        // Log results
        console.log(data);
    });
     */
    res.send(`Tag with the ID ${tag.tag_id} sent to the database for processing.`);
}

export const getTag = (req, res) => {
    //console.log(req.paramsx);
    //const id = req.params.id;
    const { id } = req.params;

    const foundTag = tags.find((tag) => tag.id == id);
    console.log(foundTag)
    if (!foundTag) {
        console.log("Tag does not exist in Blockchain.")
        res.statusCode = 400;
    } else {
        console.log("Tag information was successfully retrieved from Blockchain.")
        res.statusCode = 200;
    }

    //res.send('The GET ID ROUTE');
    //res.send(req.params);

    res.send(foundTag);
}

export const deleteTag = (req, res) => {
    const { id } = req.params;
    tags = tags.filter((tag) => tag.id != id);
    res.send(`User with the id ${id} deleted from database.`)

}

export const updateTag = (req, res) => {
    const { id } = req.params;
    const { repository_url, tag_id, commit_id } = req.body;

    const tag = tags.find((tag) => tag.id == id);

    if (repository_url) {
        tag.repository_url = repository_url;
    }

    if (tag_id) tag.tag_id = tag_id;
    if (commit_id) tag.commit_id = commit_id;

    res.send(`Tag with the tag_id ${id} has been updated.`)
}