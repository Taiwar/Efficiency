import React from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

const LoadingSpinner = () => (
    <div>
        <Segment>
            <Dimmer active>
                <Loader indeterminate>Preparing Files</Loader>
            </Dimmer>
        </Segment>
    </div>
);

export default LoadingSpinner;