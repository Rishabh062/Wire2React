import React from 'react'
import Constants from '@/data/Constants';
import { Sandpack, SandpackCodeEditor, SandpackLayout, SandpackProvider } from "@codesandbox/sandpack-react";
import {aquaBlue} from "@codesandbox/sandpack-themes"

interface ICodeEditor {
    codeResp: string;
    isReady: boolean;
}
const CodeEditor = ({ codeResp, isReady }: ICodeEditor) => {
    return (
        <div>
            {isReady ? (
                <Sandpack
                    template="react"
                    options={{
                        externalResources: ["https://cdn.tailwindcss.com"],
                        showNavigator: true,
                        showTabs: true,
                        editorHeight: 730,
                }}
                theme={aquaBlue}
                customSetup={{
                    dependencies: {
                        ...Constants.DEPENDANCY
                    }
                }}
                files={{
                    "/App.js": `${codeResp}`,
                }}
            />
            ) : (
                <SandpackProvider template="react"
                    theme={aquaBlue}
                    files={{
                        "/app.js": {
                            code: `${codeResp}`,
                            active: true
                        }
                    }}
                    customSetup={{
                        dependencies: {
                            ...Constants.DEPENDANCY
                        }
                    }}
                    options={{
                        externalResources: ["https://cdn.tailwindcss.com"],
                    }}
                >
                    <SandpackLayout>

                        <SandpackCodeEditor showTabs={true} style={{ height: '70vh' }} />
                    </SandpackLayout>
                </SandpackProvider>
            )}
        </div>
    )
}

export default CodeEditor
