export default function Photo({ url, classes, draggable }) {
    return (
        <img
            src={url} 
            className={classes} 
            draggable={draggable} 
        />
    )
}