import React, { useState } from 'react';
import { Card, Button, ToggleSwitch, Input, TagInput } from '../ui.tsx';

export const TaskPoliciesSettings: React.FC = () => {
    const [priorities, setPriorities] = useState(['Low', 'Medium', 'High', 'Urgent']);
    const [statuses, setStatuses] = useState(['Draft', 'In Progress', 'Blocked', 'In Review', 'Done']);
    
  return (
    <div className="space-y-6">
      <Card
        title="Task Policies"
        description="Define the rules and workflows for tasks across all projects."
        footer={<Button>Save Changes</Button>}
      >
        <TagInput 
            label="Priority Scales" 
            tags={priorities} 
            setTags={setPriorities}
            helperText="Define the levels of priority available for tasks."
        />
        <TagInput 
            label="Status Workflow" 
            tags={statuses}
            setTags={setStatuses}
            helperText="Define the stages a task moves through from start to finish."
        />
        <Input 
            label="WIP (Work-In-Progress) Limit per User" 
            type="number" 
            defaultValue="5"
            helperText="Maximum number of tasks a user can have in an 'In Progress' state."
        />
        <Input 
            label="Default Due Date Rule (days from creation)" 
            type="number" 
            defaultValue="7"
            helperText="Automatically set a due date this many days in the future for new tasks."
        />
         <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mandatory Fields on Task Creation</label>
            <div className="space-y-2 p-4 border rounded-lg">
                <ToggleSwitch label="Require Assignee" enabled={true} setEnabled={() => {}} />
                <ToggleSwitch label="Require Due Date" enabled={true} setEnabled={() => {}} />
                <ToggleSwitch label="Require Priority" enabled={false} setEnabled={() => {}} />
            </div>
        </div>
      </Card>
    </div>
  );
};
