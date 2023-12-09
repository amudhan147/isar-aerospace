import { Typography, List, ListItem, ListItemText } from '@mui/material';



const Comments = () => {

    // Your API comment data
    const comments = [
        { id: 1, text: 'Versioning: Consider adding versioning to the API to handle future changes without breaking existing clients. For example, prefix endpoints with /v1/.' },
        { id: 2, text: 'Consistency in Naming: Ensure a consistent naming convention for endpoints. For example, use plural forms for resource names (e.g., /spectrum/status instead of /SpectrumStatus).' },
        { id: 3, text: 'HTTP Status Codes: Use appropriate HTTP status codes for responses (e.g., 200 for success, 4xx for client errors, 5xx for server errors).' },
    ];

    return (
        <>
            <Typography variant="h5" gutterBottom>
                API Improvement Comments
            </Typography>
            <List>
                {comments.map((comment) => (
                    <ListItem key={comment.id}>
                        <ListItemText primary={comment.text} />
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default Comments;
