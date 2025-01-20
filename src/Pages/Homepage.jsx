import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewProject from "./NewProject";
import UploadProject from "./UploadProject";

const Homepage = () => {
    return (
        <Tabs
            defaultValue="new-project"
            className="w-[400px] mx-auto mt-auto h-screen flex flex-col justify-center items-center"
        >
            <TabsList>
                <TabsTrigger value="new-project">New Project</TabsTrigger>
                <TabsTrigger value="upload-project">Upload Project</TabsTrigger>
            </TabsList>
            <TabsContent value="new-project">
                <NewProject />
            </TabsContent>
            <TabsContent value="upload-project">
                <UploadProject />
            </TabsContent>
        </Tabs>
    );
};

export default Homepage;
