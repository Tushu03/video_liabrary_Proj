// components/Comments.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { TextField, Button, Typography, Box, Divider } from "@mui/material";
import { toast } from "react-toastify";
import {formatDistanceToNow} from "date-fns"

interface CommentType {
    comment_id: number;
    username: string;
    text: string;
    timestamp: string;
}

export function Comments({ video_id }: { video_id: number }) {
    const [comments, setComments] = useState<CommentType[]>([]);
    const [newComment, setNewComment] = useState("");
    const [cookies] = useCookies(["username"]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5050/comments/${video_id}`)
            .then(res => setComments(res.data))
            .catch(err => console.error(err));
    }, [video_id]);

    const handlePostComment = () => {
        if (newComment.trim()) {
            const commentData = {
                username: cookies["username"],
                video_id,
                text: newComment.trim(),
            };

            axios.post("http://127.0.0.1:5050/comments", commentData)
                .then(res => {
                    setComments(prev => [...prev, res.data]);
                    setNewComment("");
                    toast.success("Comment Added");
                });
        }
    };

    const displayedComments = showAll ? comments : comments.slice(0, 2);

    return (
        <div>
            <Box sx={{ width: "100%" }}>
                <Typography variant="h6">Comments</Typography>
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button variant="contained" onClick={handlePostComment}>
                        Post
                    </Button>
                </Box>
                <Divider sx={{ my: 2 }} />                
            </Box>
            <div className="w-100">
                {displayedComments.map((comment: any, idx: number) => (
                    <div key={idx} className="mb-2">
                        <div className="d-flex align-items-center">
                           
                            <div className="bg-primary rounded-circle text-white text-center me-2" style={{ width: 35, height: 35, lineHeight: '35px' }}>
                                {comment.username?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <strong>{comment.username}</strong>
                                <Typography variant="body2" color="text.secondary">{comment.comment}</Typography>
                                <Typography variant="caption" color="text.secondary">{formatDistanceToNow(new Date(comment.timestamp),{addSuffix:true})}</Typography>
                            </div>
                        </div>
                        <Divider className="my-2" />
                    </div>
                ))}
                {comments.length > 2 && (
                    <Button size="small" onClick={() => setShowAll(!showAll)}>
                        {showAll ? "Hide comments" : `View all ${comments.length} comments`}
                    </Button>
                )}
            </div>
        </div>
    );
}
