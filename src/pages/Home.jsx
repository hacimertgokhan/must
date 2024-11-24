import { useState } from 'react';
import { invoke } from "@tauri-apps/api/core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function App() {
    const [url, setUrl] = useState('');
    const [method, setMethod] = useState('GET');
    const [headers, setHeaders] = useState('');
    const [body, setBody] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [responseTab, setResponseTab] = useState('raw');

    // Format JSON string with proper indentation
    const formatJSON = (jsonString) => {
        try {
            const parsed = JSON.parse(jsonString);
            return JSON.stringify(parsed, null, 2);
        } catch {
            return jsonString;
        }
    };

    const sendRequest = async () => {
        try {
            setLoading(true);

            // Parse headers from string to object
            const headersObj = headers
                .split('\n')
                .filter(line => line.trim())
                .reduce((acc, line) => {
                    const [key, value] = line.split(':').map(item => item.trim());
                    if (key && value) acc[key] = value;
                    return acc;
                }, {});

            // Invoke Tauri command
            const result = await invoke('make_request', {
                url,
                method,
                headers: headersObj,
                body: body || null
            });

            setResponse(result.body);
        } catch (error) {
            setResponse(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const renderJSONView = () => {
        try {
            const jsonData = JSON.parse(response);
            return (
                <pre className="bg-gray-50 p-4 rounded-lg overflow-auto text-sm">
                    <code className="text-sm font-mono whitespace-pre">
                        {JSON.stringify(jsonData, null, 2)}
                    </code>
                </pre>
            );
        } catch {
            return (
                <div className="text-yellow-600 bg-yellow-50 p-4 rounded-lg">
                    Response is not valid JSON
                </div>
            );
        }
    };

    return (
        <div className="w-full mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle>HTTP Requests</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <Select value={method} onValueChange={setMethod}>
                                <SelectTrigger className="w-32">
                                    <SelectValue>{method}</SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="GET">GET</SelectItem>
                                    <SelectItem value="POST">POST</SelectItem>
                                    <SelectItem value="PUT">PUT</SelectItem>
                                    <SelectItem value="DELETE">DELETE</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input
                                placeholder="Enter URL"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="flex-1"
                            />
                        </div>

                        <div>
                            <h3 className="mb-2 font-medium">Headers</h3>
                            <Textarea
                                placeholder="Content-Type: application/json&#10;Authorization: Bearer token"
                                value={headers}
                                onChange={(e) => setHeaders(e.target.value)}
                                rows={4}
                            />
                        </div>

                        <div>
                            <h3 className="mb-2 font-medium">Request Body</h3>
                            <Textarea
                                placeholder="Enter request body (JSON)"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                rows={4}
                            />
                        </div>

                        <Button
                            onClick={sendRequest}
                            disabled={loading || !url}
                            className="w-full"
                        >
                            {loading ? 'Sending...' : 'Send Request'}
                        </Button>

                        <div>
                            <h3 className="mb-2 font-medium">Response</h3>
                            <Tabs value={responseTab} onValueChange={setResponseTab}>
                                <TabsList>
                                    <TabsTrigger value="formatted">Formatted</TabsTrigger>
                                    <TabsTrigger value="raw">Raw</TabsTrigger>
                                </TabsList>
                                <TabsContent value="formatted">
                                    {response && renderJSONView()}
                                </TabsContent>
                                <TabsContent value="raw">
                                    <Textarea
                                        value={response}
                                        readOnly
                                        className="font-mono max-h-96"
                                        rows={20}
                                    />
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default App;