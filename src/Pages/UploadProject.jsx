import HomepageCard from "@/components/custom/HomepageCard";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setState } from "@/Redux/Redux-Slices/lineSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const UploadProject = () => {
    const [file, setFile] = React.useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleJsonUpload = () => {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            try {
                const jsonData = JSON.parse(reader.result);
                dispatch(setState(jsonData));
            } catch (error) {
                console.error("Errore nel parse del JSON:", error);
            }
        };
        reader.readAsText(file);
        navigate("/editor");
    };
    return (
        <HomepageCard
            title="Upload Project"
            description={"Upload your project here."}
        >
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label>File</Label>
                        <Input
                            placeholder="upload JSON file"
                            type="file"
                            onChange={e => setFile(e.target.files[0])}
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button
                    className="ms-auto"
                    onClick={handleJsonUpload}
                    disabled={!file}
                >
                    Upload
                </Button>
            </CardFooter>
        </HomepageCard>
    );
};

export default UploadProject;
