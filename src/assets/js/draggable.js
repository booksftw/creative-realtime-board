console.log('draggable connected')

// ! Find a way to identify each client uniquely so that you can control the flow of whos grabbing the object
function randomId() {
    return Math.floor(Math.random() * 1000) // Update this to be actually random
}

const sessionId = randomId()
/**`
 *   onInit get the blocks type and id pass that to the generator - 1 GENERATE
 *   that block type and get the block state from the database and bind the component to the db - 2 PASS GENERATED TO RENDER
 *   OnBlock Click create new block and add to the firebase
 */
function onInit(){

    db.child('room').child('0').child('blocks').once('value', (snapshot) => {
        const blocksSet = snapshot.val()

        for (const key in blocksSet) {
            if (blocksSet.hasOwnProperty(key)) {
                const el = blocksSet[key]
                const blockId = el.id
                const blockType = el.type
                const blockContent = el.content
                const block = generateComponent(blockId, blockType, blockContent)
                renderToPage(block, blockId)
            }
        }

    })

}
onInit()

//* Render and make divs draggable
function renderToPage(component, blockId) {
    fbId = 'id'+blockId
    // let blockX = doc1.room[0].blocks[fbId].pos1
    // let blockY = doc1.room[0].blocks[fbId].pos2

    // ! We'll need to connect the database somehow
    // ! because when we add a new block to our board all other clients need to be updated

    //* Get all the blocks from the db and pass the intial coords to the generate component
    const draggableElement =
        `<div id=${blockId} class="draggable">
            ${component}
        </div>`

    if (component) {
        $(".board_container").append(
            `${draggableElement}`
        )
    }
    getEl = $(`div#${blockId}`)[0] // ! have to select the block here some how
    console.log(getEl)

    db.child('room').child('0').child('blocks').child(`id${blockId}`).once('value', (snapshot) => {
        // getEl.css('left', 400);
        // getEl.css('background-color', 'purple')
        // console.log(snapshot.val().pos1)
        console.log(snapshot.val().pos1)
        $(`div#${blockId}`).css('left', snapshot.val().pos3) 
        $(`div#${blockId}`).css('top', snapshot.val().pos4) 
    })

    // Enable drag
    dragElement(getEl)
}


function generateComponent (id, type, content) {

    switch (type) {
        case 'text':
            console.log('is Text')
            return generateTextComponent(content)
            break;
        case 'image':
            console.log('is Image')
            return generateImageComponent(content)
            break;
        default:
            break;
    }
}

// ! Successfully adding to databse but it's not working as user would expected
function addComponentToFirebase() {
    // get room id
    let randomId = Math.floor(Math.random() * 1000)
    console.log(randomId)
    // add in room with unique id to firebase
    db.child('room').child('0').child('blocks/id' + randomId ).set({
        id: randomId, type: 'text', content: "I'm a text block create on the fly", pos1:100, pos2:200, pos3:0, pos4:0
    })

    // if text block type
    const textBlock = generateTextComponent("I'm a text block create on the fly")
    renderToPage(textBlock, randomId)
    console.log('add component to firebase')

}

// This text block needs to have these components in the db    id1: { id: 1, type: 'text', content: "I'm a text block", pos1:100,pos2:200}, //unique id
function generateImageComponent(imgSrc) {
    const imgComponent = `<img style="width: 100%" src=${imgSrc} />` // Replace the inline styling later
    return imgComponent
}
function generateTextComponent(text) {
    const textComponent = `<h1 class="textBlock"> ${text} </h1>`
    return textComponent
}


function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    // otherwise, move the DIV from anywhere inside the DIV: 
    // elmnt.onmousedown = dragMouseDown
    elmnt.addEventListener('mousedown', dragMouseDown)
    
    function dragMouseDown(e) {
        const blockId = elmnt.id
        const userId = sessionId 
        elmnt.userDragging = userId
        e = e || window.event
        e.preventDefault()

        // ? Does this seperate the dragger and receiver successfully
        if (elmnt.userDragging === userId) {
            // update node directly
            pos3 = e.clientX
            pos4 = e.clientY
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag
        } else {
            // else update it through throttled firebase
            var posUpdate = {
                pos3: e.clientX,
                pos4: e.clientY
            }
            db.child('room').child('0').child('blocks').child(`id${blockId}`).update(posUpdate).then( () => {
                throttleElementDrag = _.throttle(elementDrag, 150)
                document.onmousemove = throttleElementDrag//elementDrag;
            })
        }

        sendForReceiver()

        document.onmouseup = closeDragElement;
    }


    function sendForReceiver() {

        console.log('i receiver')
    }


    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        const userId = sessionId // replace this with cookies
        if (elmnt.userDragging === userId) {
            pos1 = pos3 - e.clientX // Old Mouse X Location - New Mouse X Location
            pos2 = pos4 - e.clientY // Old Mouse Y Location - New Mouse Y Location
            pos3 = e.clientX // Update coords X
            pos4 = e.clientY // Update coords Y
            
            // Move the block
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px" // Y update the object directly
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"// X

            const elmntId = elmnt.id
            // Testing by selecting id1
            db.child('room').child('0').child('blocks').child(`id${elmntId}`).once('value', (snapshot) => {
                //? Update firebase so that other users will get updated positions
                posUpdates = {
                    pos1: snapshot.val().pos3 - e.clientX,
                    pos2: snapshot.val().pos4 - e.clientY,
                    pos3: e.clientX,
                    pos4: e.clientY
                }
                const elmntId = elmnt.id
                db.child('room').child('0').child('blocks').child(`id${elmntId}`).update(posUpdates)
            })   

        } 
    }

    /**
     * 
     * 
     * 
     *
     */
    //? Do I need a shadow dom or is there another way?
    db.child('room').child('0').child('blocks').on('value', (snapshot) => {
        const pos1 = snapshot.val().pos1
        const pos2 = snapshot.val().pos2
        const pos3 = snapshot.val().pos3
        const pos4 = snapshot.val().pos4

        for (let key in snapshot.val()) {
            if (snapshot.val().hasOwnProperty(key)) {
                let el = snapshot.val()[key]
                const blockId = el.id
                var block = $(`div#${blockId}`)[0]

                // just completely update it.
                console.log('pos3',el.pos3, 'pos4', el.pos4)
                $(`div#${blockId}`).css('top', el.pos4)
                $(`div#${blockId}`).css('left', el.pos3)
            }
        }
    })



    /**
     * 
     * 
     * 
     * 
     * 
     */

    function closeDragElement(e) {
        //! Cut the firebase listeners when client lets go
        console.log('client let go')
        // Release the user lock
        elmnt.userDragging = null

        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


