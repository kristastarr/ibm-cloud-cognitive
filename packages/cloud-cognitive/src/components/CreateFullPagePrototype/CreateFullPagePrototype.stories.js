/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react';

import {
  getStoryTitle,
  prepareStory,
} from '../../global/js/utils/story-helper';
import { action } from '@storybook/addon-actions';
import { CreateFullPagePrototype } from '.';
import { CreateFullPageStepPrototype } from './CreateFullPageStepPrototype';
import { pkg } from '../../settings';
import mdx from './CreateFullPagePrototype.mdx';
import cx from 'classnames';

import styles from './_storybook-styles.scss';

const storyClass = 'create-full-page-stories';
const blockClass = `${pkg.prefix}--create-full-page`;

import {
  TextInput,
  NumberInput,
  InlineNotification,
  Toggle,
  Tooltip,
  RadioButtonGroup,
  RadioButton,
  FormGroup,
  Row,
  Column,
} from 'carbon-components-react';

export default {
  title: getStoryTitle(CreateFullPagePrototype.displayName),
  component: CreateFullPagePrototype,
  subcomponents: {
    CreateFullPageStepPrototype,
  },
  parameters: {
    styles,
    layout: 'fullscreen',
    docs: { page: mdx },
    controls: { sort: 'requiredFirst' },
  },
  argTypes: {
    includeViewAllToggle: { control: { disable: true } },
    initialStep: { control: { disable: true } },
  },
  decorators: [
    (story) => <div className={`${storyClass}__viewport`}>{story()}</div>,
  ],
};

const defaultFullPageProps = {
  includeViewAllToggle: true,
  nextButtonText: 'Next',
  backButtonText: 'Back',
  cancelButtonText: 'Cancel',
  submitButtonText: 'Create',
  modalTitle: 'Are you sure you want to cancel?',
  modalDescription:
    "If you cancel, the information you have entered won't be saved.",
  modalDangerButtonText: 'Cancel partition',
  modalSecondaryButtonText: 'Return to form',
  onRequestSubmit: action('Submit handler called'),
  onClose: action('Close handler called'),
  viewAllToggleOnLabelText: 'On',
  viewAllToggleOffLabelText: 'Off',
  viewAllToggleLabelText: 'Advanced settings',
};

const TemplateWithToggleLastInCompleteStep = ({ ...args }) => {
  const [textInput, setTextInput] = useState('');
  const [secondTextInput, setSecondTextInput] = useState('');
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [shouldReject, setShouldReject] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isInvalid2, setIsInvalid2] = useState(false);
  const [simulatedDelay] = useState(750);

  const children = [
    <CreateFullPageStepPrototype
      key={1}
      title="Partition"
      subtitle="One or more partitions make up a topic. A partition is an ordered list
    of messages."
      description="Partitions are distributed across the brokers in order to increase the
    scalability of your topic. You can also use them to distribute
    messages across the members of a consumer group."
      hasForm={false}
      onNext={() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // Example usage of how to prevent the next step if some kind
            // of error occurred during the `onNext` handler.
            if (shouldReject) {
              setHasSubmitError(true);
              reject();
            }
            setIsInvalid(false);
            resolve();
          }, simulatedDelay);
        });
      }}
      disableSubmit={!textInput}>
      <Row>
        <Column xlg={5} lg={5} md={4} sm={4}>
          <FormGroup
            className={`${blockClass}__step-fieldset ${storyClass}__step-fieldset--label`}
            legendText="Partition">
            <TextInput
              id="test1"
              invalidText="A valid value is required"
              labelText="Topic name"
              placeholder="Enter topic name"
              onChange={(e) => {
                setTextInput(e.target.value);
                setIsInvalid(false);
              }}
              onBlur={() => {
                textInput.length === 0 && setIsInvalid(true);
              }}
              invalid={isInvalid}
            />
            {hasSubmitError && (
              <InlineNotification
                lowContrast
                kind="error"
                title="Error"
                subtitle="Resolve errors to continue"
                onClose={() => setHasSubmitError(false)}
              />
            )}
            <div>
              <Tooltip
                triggerClassName={`${storyClass}__tooltip`}
                direction="right"
                tabIndex={0}>
                <p>
                  Once toggled on, an inline error notification will appear upon
                  clicking next. This is an example usage of how to prevent the
                  next step if some kind of error occurred during the `onNext`
                  handler.
                </p>
              </Tooltip>
              <Toggle
                className={`${storyClass}__error--toggle`}
                id="simulated-error-toggle"
                size="sm"
                labelText="Simulate error"
                onToggle={(event) => setShouldReject(event)}
              />
            </div>
          </FormGroup>
        </Column>
      </Row>
      <span className={`${blockClass}__section-divider`} />
      <h5 className={`${blockClass}__step-title`}>Core configuration</h5>
      <h6 className={`${blockClass}__step-subtitle`}>
        This is how long messages are retained before they are deleted.
      </h6>
      <FormGroup
        className={`${blockClass}__step-fieldset ${storyClass}__step-fieldset--label`}
        legendText="Core configuration">
        <p className={`${blockClass}__step-description`}>
          If your messages are not read by a consumer within this time, they
          will be missed.
        </p>
        <Row>
          <Column xlg={5} lg={5} md={4} sm={4}>
            <TextInput
              id="input-2"
              invalidText="A valid value is required"
              labelText="Topic name (optional)"
              placeholder="Enter topic name"
            />
          </Column>
        </Row>
        <Row>
          <Column xlg={4} lg={4} md={2} sm={2}>
            <NumberInput
              id="tj-input-3"
              invalidText="Number is not valid"
              label="Label (optional)"
              max={100}
              min={0}
              step={10}
              value={0}
            />
            <NumberInput
              id="tj-input-4"
              invalidText="Number is not valid"
              label="Label (optional)"
              max={100}
              min={0}
              step={10}
              value={0}
            />
          </Column>
        </Row>
        <Row>
          <Column xlg={5} lg={5} md={4} sm={4}>
            <TextInput
              id="input-5"
              invalidText="A valid value is required"
              labelText="Minimum in-sync replicas (optional)"
              placeholder="Enter topic name"
            />
          </Column>
        </Row>
      </FormGroup>
    </CreateFullPageStepPrototype>,
    <CreateFullPageStepPrototype
      key={2}
      viewAllOnly
      title="Hidden"
      subtitle="One or more partitions make up a topic. A partition is an ordered list
    of messages."
      description="Partitions are distributed across the brokers in order to increase the
    scalability of your topic. You can also use them to distribute
    messages across the members of a consumer group."
      hasForm={false}
      onNext={() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // Example usage of how to prevent the next step if some kind
            // of error occurred during the `onNext` handler.
            if (shouldReject) {
              setHasSubmitError(true);
              reject();
            }
            setIsInvalid(false);
            resolve();
          }, simulatedDelay);
        });
      }}>
      <Row>
        <Column xlg={5} lg={5} md={4} sm={4}>
          <FormGroup
            className={`${blockClass}__step-fieldset ${storyClass}__step-fieldset--label`}
            legendText="Hidden">
            <TextInput
              id="test2"
              invalidText="A valid value is required"
              labelText="Topic name"
              placeholder="Enter topic name"
              onChange={(e) => {
                setSecondTextInput(e.target.value);
                setIsInvalid(false);
              }}
              onBlur={() => {
                secondTextInput.length === 0 && setIsInvalid2(true);
              }}
              invalid={isInvalid2}
            />
          </FormGroup>
        </Column>
      </Row>
    </CreateFullPageStepPrototype>,
    <CreateFullPageStepPrototype
      key={3}
      title="Message retention"
      subtitle="This is how many copies of a topic will be made for high availability"
      description="The partitions of each topic can be replicated across a configurable number of brokers."
      formLegendText="Replicas">
      <div>
        <RadioButtonGroup
          defaultSelected="standard"
          legend="Group Legend"
          name="radio-button-group"
          valueSelected="standard"
          orientation="vertical">
          <RadioButton
            id="radio-1"
            labelText="Replication factor: 1"
            value="standard"
          />
          <RadioButton
            id="radio-2"
            labelText="Replication factor: 2"
            value="default-selected"
          />
          <RadioButton
            id="radio-3"
            labelText="Replication factor: 3"
            value="disabled"
          />
        </RadioButtonGroup>
      </div>
    </CreateFullPageStepPrototype>,
    <CreateFullPageStepPrototype
      key={4}
      viewAllOnly
      title="Hidden step"
      subtitle="This is how many copies of a topic will be made for high availability"
      description="The partitions of each topic can be replicated across a configurable number of brokers."
      formLegendText="Replicas">
      <div>
        <RadioButtonGroup
          defaultSelected="default-selected"
          legend="Group Legend"
          name="radio-button-group-2"
          valueSelected="standard"
          orientation="vertical">
          <RadioButton
            id="radio-8"
            labelText="Replication factor: 1"
            value="standard"
          />
          <RadioButton
            id="radio-9"
            labelText="Replication factor: 2"
            value="default-selected"
          />
          <RadioButton
            id="radio-10"
            labelText="Replication factor: 3"
            value="disabled"
          />
        </RadioButtonGroup>
      </div>
    </CreateFullPageStepPrototype>,
  ];

  return (
    <CreateFullPagePrototype
      {...args}
      className={`${blockClass}`}
      initialStep={textInput.length > 0 ? 2 : 1}>
      {children.map((child) => child)}
    </CreateFullPagePrototype>
  );
};

const TemplateWithToggleStep1 = ({ ...args }) => {
  const [textInput, setTextInput] = useState('');
  const [secondTextInput, setSecondTextInput] = useState('');
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [shouldReject, setShouldReject] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isInvalid2, setIsInvalid2] = useState(false);
  const [simulatedDelay] = useState(750);

  const children = [
    <CreateFullPageStepPrototype
      key={1}
      title="Partition"
      subtitle="One or more partitions make up a topic. A partition is an ordered list
    of messages."
      description="Partitions are distributed across the brokers in order to increase the
    scalability of your topic. You can also use them to distribute
    messages across the members of a consumer group."
      hasForm={false}
      onNext={() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // Example usage of how to prevent the next step if some kind
            // of error occurred during the `onNext` handler.
            if (shouldReject) {
              setHasSubmitError(true);
              reject();
            }
            setIsInvalid(false);
            resolve();
          }, simulatedDelay);
        });
      }}
      disableSubmit={!textInput}>
      <Row>
        <Column xlg={5} lg={5} md={4} sm={4}>
          <FormGroup
            className={`${blockClass}__step-fieldset ${storyClass}__step-fieldset--label`}
            legendText="Partition">
            <TextInput
              id="test1"
              invalidText="A valid value is required"
              labelText="Topic name"
              placeholder="Enter topic name"
              onChange={(e) => {
                setTextInput(e.target.value);
                setIsInvalid(false);
              }}
              onBlur={() => {
                textInput.length === 0 && setIsInvalid(true);
              }}
              invalid={isInvalid}
            />
            {hasSubmitError && (
              <InlineNotification
                lowContrast
                kind="error"
                title="Error"
                subtitle="Resolve errors to continue"
                onClose={() => setHasSubmitError(false)}
              />
            )}
            <div>
              <Tooltip
                triggerClassName={`${storyClass}__tooltip`}
                direction="right"
                tabIndex={0}>
                <p>
                  Once toggled on, an inline error notification will appear upon
                  clicking next. This is an example usage of how to prevent the
                  next step if some kind of error occurred during the `onNext`
                  handler.
                </p>
              </Tooltip>
              <Toggle
                className={`${storyClass}__error--toggle`}
                id="simulated-error-toggle"
                size="sm"
                labelText="Simulate error"
                onToggle={(event) => setShouldReject(event)}
              />
            </div>
          </FormGroup>
        </Column>
      </Row>
      <span className={`${blockClass}__section-divider`} />
      <h5 className={`${blockClass}__step-title`}>Core configuration</h5>
      <h6 className={`${blockClass}__step-subtitle`}>
        This is how long messages are retained before they are deleted.
      </h6>
      <FormGroup
        className={`${blockClass}__step-fieldset ${storyClass}__step-fieldset--label`}
        legendText="Core configuration">
        <p className={`${blockClass}__step-description`}>
          If your messages are not read by a consumer within this time, they
          will be missed.
        </p>
        <Row>
          <Column xlg={5} lg={5} md={4} sm={4}>
            <TextInput
              id="input-2"
              invalidText="A valid value is required"
              labelText="Topic name (optional)"
              placeholder="Enter topic name"
            />
          </Column>
        </Row>
        <Row>
          <Column xlg={4} lg={4} md={2} sm={2}>
            <NumberInput
              id="tj-input-3"
              invalidText="Number is not valid"
              label="Label (optional)"
              max={100}
              min={0}
              step={10}
              value={0}
            />
            <NumberInput
              id="tj-input-4"
              invalidText="Number is not valid"
              label="Label (optional)"
              max={100}
              min={0}
              step={10}
              value={0}
            />
          </Column>
        </Row>
        <Row>
          <Column xlg={5} lg={5} md={4} sm={4}>
            <TextInput
              id="input-5"
              invalidText="A valid value is required"
              labelText="Minimum in-sync replicas (optional)"
              placeholder="Enter topic name"
            />
          </Column>
        </Row>
      </FormGroup>
    </CreateFullPageStepPrototype>,
    <CreateFullPageStepPrototype
      key={2}
      viewAllOnly
      title="Hidden"
      subtitle="One or more partitions make up a topic. A partition is an ordered list
    of messages."
      description="Partitions are distributed across the brokers in order to increase the
    scalability of your topic. You can also use them to distribute
    messages across the members of a consumer group."
      hasForm={false}
      onNext={() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // Example usage of how to prevent the next step if some kind
            // of error occurred during the `onNext` handler.
            if (shouldReject) {
              setHasSubmitError(true);
              reject();
            }
            setIsInvalid(false);
            resolve();
          }, simulatedDelay);
        });
      }}>
      <Row>
        <Column xlg={5} lg={5} md={4} sm={4}>
          <FormGroup
            className={`${blockClass}__step-fieldset ${storyClass}__step-fieldset--label`}
            legendText="Hidden">
            <TextInput
              id="test2"
              invalidText="A valid value is required"
              labelText="Topic name"
              placeholder="Enter topic name"
              onChange={(e) => {
                setSecondTextInput(e.target.value);
                setIsInvalid(false);
              }}
              onBlur={() => {
                secondTextInput.length === 0 && setIsInvalid2(true);
              }}
              invalid={isInvalid2}
            />
          </FormGroup>
        </Column>
      </Row>
    </CreateFullPageStepPrototype>,
    <CreateFullPageStepPrototype
      key={3}
      title="Message retention"
      subtitle="This is how many copies of a topic will be made for high availability"
      description="The partitions of each topic can be replicated across a configurable number of brokers."
      formLegendText="Replicas">
      <div>
        <RadioButtonGroup
          defaultSelected="standard"
          legend="Group Legend"
          name="radio-button-group"
          valueSelected="standard"
          orientation="vertical">
          <RadioButton
            id="radio-1"
            labelText="Replication factor: 1"
            value="standard"
          />
          <RadioButton
            id="radio-2"
            labelText="Replication factor: 2"
            value="default-selected"
          />
          <RadioButton
            id="radio-3"
            labelText="Replication factor: 3"
            value="disabled"
          />
        </RadioButtonGroup>
      </div>
    </CreateFullPageStepPrototype>,
    <CreateFullPageStepPrototype
      key={4}
      viewAllOnly
      title="Hidden step"
      subtitle="This is how many copies of a topic will be made for high availability"
      description="The partitions of each topic can be replicated across a configurable number of brokers."
      formLegendText="Replicas">
      <div>
        <RadioButtonGroup
          defaultSelected="default-selected"
          legend="Group Legend"
          name="radio-button-group-2"
          valueSelected="standard"
          orientation="vertical">
          <RadioButton
            id="radio-8"
            labelText="Replication factor: 1"
            value="standard"
          />
          <RadioButton
            id="radio-9"
            labelText="Replication factor: 2"
            value="default-selected"
          />
          <RadioButton
            id="radio-10"
            labelText="Replication factor: 3"
            value="disabled"
          />
        </RadioButtonGroup>
      </div>
    </CreateFullPageStepPrototype>,
  ];

  return (
    <CreateFullPagePrototype
      {...args}
      className={`${blockClass}`}
      initialStep={1}>
      {children.map((child) => child)}
    </CreateFullPagePrototype>
  );
};

const TemplateWithManySteps = ({ ...args }) => {
  const [textInput, setTextInput] = useState('');
  const [secondTextInput, setSecondTextInput] = useState('');
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [shouldReject, setShouldReject] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isInvalid2, setIsInvalid2] = useState(false);
  const [simulatedDelay] = useState(750);

  const children = [
    <CreateFullPageStepPrototype
      key={1}
      title="Partition"
      subtitle="One or more partitions make up a topic. A partition is an ordered list
    of messages."
      description="Partitions are distributed across the brokers in order to increase the
    scalability of your topic. You can also use them to distribute
    messages across the members of a consumer group."
      hasForm={false}
      onNext={() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // Example usage of how to prevent the next step if some kind
            // of error occurred during the `onNext` handler.
            if (shouldReject) {
              setHasSubmitError(true);
              reject();
            }
            setIsInvalid(false);
            resolve();
          }, simulatedDelay);
        });
      }}
      disableSubmit={!textInput}>
      <Row>
        <Column xlg={5} lg={5} md={4} sm={4}>
          <FormGroup
            className={`${blockClass}__step-fieldset ${storyClass}__step-fieldset--label`}
            legendText="Partition">
            <TextInput
              id="test1"
              invalidText="A valid value is required"
              labelText="Topic name"
              placeholder="Enter topic name"
              onChange={(e) => {
                setTextInput(e.target.value);
                setIsInvalid(false);
              }}
              onBlur={() => {
                textInput.length === 0 && setIsInvalid(true);
              }}
              invalid={isInvalid}
            />
            {hasSubmitError && (
              <InlineNotification
                lowContrast
                kind="error"
                title="Error"
                subtitle="Resolve errors to continue"
                onClose={() => setHasSubmitError(false)}
              />
            )}
            <div>
              <Tooltip
                triggerClassName={`${storyClass}__tooltip`}
                direction="right"
                tabIndex={0}>
                <p>
                  Once toggled on, an inline error notification will appear upon
                  clicking next. This is an example usage of how to prevent the
                  next step if some kind of error occurred during the `onNext`
                  handler.
                </p>
              </Tooltip>
              <Toggle
                className={`${storyClass}__error--toggle`}
                id="simulated-error-toggle"
                size="sm"
                labelText="Simulate error"
                onToggle={(event) => setShouldReject(event)}
              />
            </div>
          </FormGroup>
        </Column>
      </Row>
      <span className={`${blockClass}__section-divider`} />
      <h5 className={`${blockClass}__step-title`}>Core configuration</h5>
      <h6 className={`${blockClass}__step-subtitle`}>
        This is how long messages are retained before they are deleted.
      </h6>
      <FormGroup
        className={`${blockClass}__step-fieldset ${storyClass}__step-fieldset--label`}
        legendText="Core configuration">
        <p className={`${blockClass}__step-description`}>
          If your messages are not read by a consumer within this time, they
          will be missed.
        </p>
        <Row>
          <Column xlg={5} lg={5} md={4} sm={4}>
            <TextInput
              id="input-2"
              invalidText="A valid value is required"
              labelText="Topic name (optional)"
              placeholder="Enter topic name"
            />
          </Column>
        </Row>
        <Row>
          <Column xlg={4} lg={4} md={2} sm={2}>
            <NumberInput
              id="tj-input-3"
              invalidText="Number is not valid"
              label="Label (optional)"
              max={100}
              min={0}
              step={10}
              value={0}
            />
            <NumberInput
              id="tj-input-4"
              invalidText="Number is not valid"
              label="Label (optional)"
              max={100}
              min={0}
              step={10}
              value={0}
            />
          </Column>
        </Row>
        <Row>
          <Column xlg={5} lg={5} md={4} sm={4}>
            <TextInput
              id="input-5"
              invalidText="A valid value is required"
              labelText="Minimum in-sync replicas (optional)"
              placeholder="Enter topic name"
            />
          </Column>
        </Row>
      </FormGroup>
    </CreateFullPageStepPrototype>,
    <CreateFullPageStepPrototype
      key={2}
      viewAllOnly
      title="Hidden"
      subtitle="One or more partitions make up a topic. A partition is an ordered list
    of messages."
      description="Partitions are distributed across the brokers in order to increase the
    scalability of your topic. You can also use them to distribute
    messages across the members of a consumer group."
      hasForm={false}
      onNext={() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // Example usage of how to prevent the next step if some kind
            // of error occurred during the `onNext` handler.
            if (shouldReject) {
              setHasSubmitError(true);
              reject();
            }
            setIsInvalid(false);
            resolve();
          }, simulatedDelay);
        });
      }}>
      <Row>
        <Column xlg={5} lg={5} md={4} sm={4}>
          <FormGroup
            className={`${blockClass}__step-fieldset ${storyClass}__step-fieldset--label`}
            legendText="Hidden">
            <TextInput
              id="test2"
              invalidText="A valid value is required"
              labelText="Topic name"
              placeholder="Enter topic name"
              onChange={(e) => {
                setSecondTextInput(e.target.value);
                setIsInvalid(false);
              }}
              onBlur={() => {
                secondTextInput.length === 0 && setIsInvalid2(true);
              }}
              invalid={isInvalid2}
            />
          </FormGroup>
        </Column>
      </Row>
    </CreateFullPageStepPrototype>,
    <CreateFullPageStepPrototype
      key={3}
      title="Message retention"
      subtitle="This is how many copies of a topic will be made for high availability"
      description="The partitions of each topic can be replicated across a configurable number of brokers."
      formLegendText="Replicas">
      <div>
        <RadioButtonGroup
          defaultSelected="standard"
          legend="Group Legend"
          name="radio-button-group"
          valueSelected="standard"
          orientation="vertical">
          <RadioButton
            id="radio-1"
            labelText="Replication factor: 1"
            value="standard"
          />
          <RadioButton
            id="radio-2"
            labelText="Replication factor: 2"
            value="default-selected"
          />
          <RadioButton
            id="radio-3"
            labelText="Replication factor: 3"
            value="disabled"
          />
        </RadioButtonGroup>
      </div>
    </CreateFullPageStepPrototype>,
    <CreateFullPageStepPrototype
      key={4}
      viewAllOnly
      title="Hidden step"
      subtitle="This is how many copies of a topic will be made for high availability"
      description="The partitions of each topic can be replicated across a configurable number of brokers."
      formLegendText="Replicas">
      <div>
        <RadioButtonGroup
          defaultSelected="default-selected"
          legend="Group Legend"
          name="radio-button-group-2"
          valueSelected="standard"
          orientation="vertical">
          <RadioButton
            id="radio-8"
            labelText="Replication factor: 1"
            value="standard"
          />
          <RadioButton
            id="radio-9"
            labelText="Replication factor: 2"
            value="default-selected"
          />
          <RadioButton
            id="radio-10"
            labelText="Replication factor: 3"
            value="disabled"
          />
        </RadioButtonGroup>
      </div>
    </CreateFullPageStepPrototype>,
    <CreateFullPageStepPrototype
      key={1}
      title="Partition"
      subtitle="One or more partitions make up a topic. A partition is an ordered list
    of messages."
      description="Partitions are distributed across the brokers in order to increase the
    scalability of your topic. You can also use them to distribute
    messages across the members of a consumer group."
      hasForm={false}
      onNext={() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // Example usage of how to prevent the next step if some kind
            // of error occurred during the `onNext` handler.
            if (shouldReject) {
              setHasSubmitError(true);
              reject();
            }
            setIsInvalid(false);
            resolve();
          }, simulatedDelay);
        });
      }}
      disableSubmit={!textInput}>
      <Row>
        <Column xlg={5} lg={5} md={4} sm={4}>
          <FormGroup
            className={`${blockClass}__step-fieldset ${storyClass}__step-fieldset--label`}
            legendText="Partition">
            <TextInput
              id="test1"
              invalidText="A valid value is required"
              labelText="Topic name"
              placeholder="Enter topic name"
              onChange={(e) => {
                setTextInput(e.target.value);
                setIsInvalid(false);
              }}
              onBlur={() => {
                textInput.length === 0 && setIsInvalid(true);
              }}
              invalid={isInvalid}
            />
            {hasSubmitError && (
              <InlineNotification
                lowContrast
                kind="error"
                title="Error"
                subtitle="Resolve errors to continue"
                onClose={() => setHasSubmitError(false)}
              />
            )}
            <div>
              <Tooltip
                triggerClassName={`${storyClass}__tooltip`}
                direction="right"
                tabIndex={0}>
                <p>
                  Once toggled on, an inline error notification will appear upon
                  clicking next. This is an example usage of how to prevent the
                  next step if some kind of error occurred during the `onNext`
                  handler.
                </p>
              </Tooltip>
              <Toggle
                className={`${storyClass}__error--toggle`}
                id="simulated-error-toggle"
                size="sm"
                labelText="Simulate error"
                onToggle={(event) => setShouldReject(event)}
              />
            </div>
          </FormGroup>
        </Column>
      </Row>
      <span className={`${blockClass}__section-divider`} />
      <h5 className={`${blockClass}__step-title`}>Core configuration</h5>
      <h6 className={`${blockClass}__step-subtitle`}>
        This is how long messages are retained before they are deleted.
      </h6>
      <FormGroup
        className={`${blockClass}__step-fieldset ${storyClass}__step-fieldset--label`}
        legendText="Core configuration">
        <p className={`${blockClass}__step-description`}>
          If your messages are not read by a consumer within this time, they
          will be missed.
        </p>
        <Row>
          <Column xlg={5} lg={5} md={4} sm={4}>
            <TextInput
              id="input-2"
              invalidText="A valid value is required"
              labelText="Topic name (optional)"
              placeholder="Enter topic name"
            />
          </Column>
        </Row>
        <Row>
          <Column xlg={4} lg={4} md={2} sm={2}>
            <NumberInput
              id="tj-input-3"
              invalidText="Number is not valid"
              label="Label (optional)"
              max={100}
              min={0}
              step={10}
              value={0}
            />
            <NumberInput
              id="tj-input-4"
              invalidText="Number is not valid"
              label="Label (optional)"
              max={100}
              min={0}
              step={10}
              value={0}
            />
          </Column>
        </Row>
        <Row>
          <Column xlg={5} lg={5} md={4} sm={4}>
            <TextInput
              id="input-5"
              invalidText="A valid value is required"
              labelText="Minimum in-sync replicas (optional)"
              placeholder="Enter topic name"
            />
          </Column>
        </Row>
      </FormGroup>
    </CreateFullPageStepPrototype>,
    <CreateFullPageStepPrototype
      key={2}
      viewAllOnly
      title="Hidden"
      subtitle="One or more partitions make up a topic. A partition is an ordered list
    of messages."
      description="Partitions are distributed across the brokers in order to increase the
    scalability of your topic. You can also use them to distribute
    messages across the members of a consumer group."
      hasForm={false}
      onNext={() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // Example usage of how to prevent the next step if some kind
            // of error occurred during the `onNext` handler.
            if (shouldReject) {
              setHasSubmitError(true);
              reject();
            }
            setIsInvalid(false);
            resolve();
          }, simulatedDelay);
        });
      }}>
      <Row>
        <Column xlg={5} lg={5} md={4} sm={4}>
          <FormGroup
            className={`${blockClass}__step-fieldset ${storyClass}__step-fieldset--label`}
            legendText="Hidden">
            <TextInput
              id="test2"
              invalidText="A valid value is required"
              labelText="Topic name"
              placeholder="Enter topic name"
              onChange={(e) => {
                setSecondTextInput(e.target.value);
                setIsInvalid(false);
              }}
              onBlur={() => {
                secondTextInput.length === 0 && setIsInvalid2(true);
              }}
              invalid={isInvalid2}
            />
          </FormGroup>
        </Column>
      </Row>
    </CreateFullPageStepPrototype>,
    <CreateFullPageStepPrototype
      key={3}
      title="Message retention"
      subtitle="This is how many copies of a topic will be made for high availability"
      description="The partitions of each topic can be replicated across a configurable number of brokers."
      formLegendText="Replicas">
      <div>
        <RadioButtonGroup
          defaultSelected="standard"
          legend="Group Legend"
          name="radio-button-group"
          valueSelected="standard"
          orientation="vertical">
          <RadioButton
            id="radio-1"
            labelText="Replication factor: 1"
            value="standard"
          />
          <RadioButton
            id="radio-2"
            labelText="Replication factor: 2"
            value="default-selected"
          />
          <RadioButton
            id="radio-3"
            labelText="Replication factor: 3"
            value="disabled"
          />
        </RadioButtonGroup>
      </div>
    </CreateFullPageStepPrototype>,
    <CreateFullPageStepPrototype
      key={4}
      viewAllOnly
      title="Hidden step"
      subtitle="This is how many copies of a topic will be made for high availability"
      description="The partitions of each topic can be replicated across a configurable number of brokers."
      formLegendText="Replicas">
      <div>
        <RadioButtonGroup
          defaultSelected="default-selected"
          legend="Group Legend"
          name="radio-button-group-2"
          valueSelected="standard"
          orientation="vertical">
          <RadioButton
            id="radio-8"
            labelText="Replication factor: 1"
            value="standard"
          />
          <RadioButton
            id="radio-9"
            labelText="Replication factor: 2"
            value="default-selected"
          />
          <RadioButton
            id="radio-10"
            labelText="Replication factor: 3"
            value="disabled"
          />
        </RadioButtonGroup>
      </div>
    </CreateFullPageStepPrototype>,
    <CreateFullPageStepPrototype
      key={1}
      title="Partition"
      subtitle="One or more partitions make up a topic. A partition is an ordered list
    of messages."
      description="Partitions are distributed across the brokers in order to increase the
    scalability of your topic. You can also use them to distribute
    messages across the members of a consumer group."
      hasForm={false}
      onNext={() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // Example usage of how to prevent the next step if some kind
            // of error occurred during the `onNext` handler.
            if (shouldReject) {
              setHasSubmitError(true);
              reject();
            }
            setIsInvalid(false);
            resolve();
          }, simulatedDelay);
        });
      }}
      disableSubmit={!textInput}>
      <Row>
        <Column xlg={5} lg={5} md={4} sm={4}>
          <FormGroup
            className={`${blockClass}__step-fieldset ${storyClass}__step-fieldset--label`}
            legendText="Partition">
            <TextInput
              id="test1"
              invalidText="A valid value is required"
              labelText="Topic name"
              placeholder="Enter topic name"
              onChange={(e) => {
                setTextInput(e.target.value);
                setIsInvalid(false);
              }}
              onBlur={() => {
                textInput.length === 0 && setIsInvalid(true);
              }}
              invalid={isInvalid}
            />
            {hasSubmitError && (
              <InlineNotification
                lowContrast
                kind="error"
                title="Error"
                subtitle="Resolve errors to continue"
                onClose={() => setHasSubmitError(false)}
              />
            )}
            <div>
              <Tooltip
                triggerClassName={`${storyClass}__tooltip`}
                direction="right"
                tabIndex={0}>
                <p>
                  Once toggled on, an inline error notification will appear upon
                  clicking next. This is an example usage of how to prevent the
                  next step if some kind of error occurred during the `onNext`
                  handler.
                </p>
              </Tooltip>
              <Toggle
                className={`${storyClass}__error--toggle`}
                id="simulated-error-toggle"
                size="sm"
                labelText="Simulate error"
                onToggle={(event) => setShouldReject(event)}
              />
            </div>
          </FormGroup>
        </Column>
      </Row>
      <span className={`${blockClass}__section-divider`} />
      <h5 className={`${blockClass}__step-title`}>Core configuration</h5>
      <h6 className={`${blockClass}__step-subtitle`}>
        This is how long messages are retained before they are deleted.
      </h6>
      <FormGroup
        className={`${blockClass}__step-fieldset ${storyClass}__step-fieldset--label`}
        legendText="Core configuration">
        <p className={`${blockClass}__step-description`}>
          If your messages are not read by a consumer within this time, they
          will be missed.
        </p>
        <Row>
          <Column xlg={5} lg={5} md={4} sm={4}>
            <TextInput
              id="input-2"
              invalidText="A valid value is required"
              labelText="Topic name (optional)"
              placeholder="Enter topic name"
            />
          </Column>
        </Row>
        <Row>
          <Column xlg={4} lg={4} md={2} sm={2}>
            <NumberInput
              id="tj-input-3"
              invalidText="Number is not valid"
              label="Label (optional)"
              max={100}
              min={0}
              step={10}
              value={0}
            />
            <NumberInput
              id="tj-input-4"
              invalidText="Number is not valid"
              label="Label (optional)"
              max={100}
              min={0}
              step={10}
              value={0}
            />
          </Column>
        </Row>
        <Row>
          <Column xlg={5} lg={5} md={4} sm={4}>
            <TextInput
              id="input-5"
              invalidText="A valid value is required"
              labelText="Minimum in-sync replicas (optional)"
              placeholder="Enter topic name"
            />
          </Column>
        </Row>
      </FormGroup>
    </CreateFullPageStepPrototype>,
    <CreateFullPageStepPrototype
      key={2}
      viewAllOnly
      title="Hidden"
      subtitle="One or more partitions make up a topic. A partition is an ordered list
    of messages."
      description="Partitions are distributed across the brokers in order to increase the
    scalability of your topic. You can also use them to distribute
    messages across the members of a consumer group."
      hasForm={false}
      onNext={() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // Example usage of how to prevent the next step if some kind
            // of error occurred during the `onNext` handler.
            if (shouldReject) {
              setHasSubmitError(true);
              reject();
            }
            setIsInvalid(false);
            resolve();
          }, simulatedDelay);
        });
      }}>
      <Row>
        <Column xlg={5} lg={5} md={4} sm={4}>
          <FormGroup
            className={`${blockClass}__step-fieldset ${storyClass}__step-fieldset--label`}
            legendText="Hidden">
            <TextInput
              id="test2"
              invalidText="A valid value is required"
              labelText="Topic name"
              placeholder="Enter topic name"
              onChange={(e) => {
                setSecondTextInput(e.target.value);
                setIsInvalid(false);
              }}
              onBlur={() => {
                secondTextInput.length === 0 && setIsInvalid2(true);
              }}
              invalid={isInvalid2}
            />
          </FormGroup>
        </Column>
      </Row>
    </CreateFullPageStepPrototype>,
    <CreateFullPageStepPrototype
      key={3}
      title="Message retention"
      subtitle="This is how many copies of a topic will be made for high availability"
      description="The partitions of each topic can be replicated across a configurable number of brokers."
      formLegendText="Replicas">
      <div>
        <RadioButtonGroup
          defaultSelected="standard"
          legend="Group Legend"
          name="radio-button-group"
          valueSelected="standard"
          orientation="vertical">
          <RadioButton
            id="radio-1"
            labelText="Replication factor: 1"
            value="standard"
          />
          <RadioButton
            id="radio-2"
            labelText="Replication factor: 2"
            value="default-selected"
          />
          <RadioButton
            id="radio-3"
            labelText="Replication factor: 3"
            value="disabled"
          />
        </RadioButtonGroup>
      </div>
    </CreateFullPageStepPrototype>,
    <CreateFullPageStepPrototype
      key={4}
      viewAllOnly
      title="Hidden step"
      subtitle="This is how many copies of a topic will be made for high availability"
      description="The partitions of each topic can be replicated across a configurable number of brokers."
      formLegendText="Replicas">
      <div>
        <RadioButtonGroup
          defaultSelected="default-selected"
          legend="Group Legend"
          name="radio-button-group-2"
          valueSelected="standard"
          orientation="vertical">
          <RadioButton
            id="radio-8"
            labelText="Replication factor: 1"
            value="standard"
          />
          <RadioButton
            id="radio-9"
            labelText="Replication factor: 2"
            value="default-selected"
          />
          <RadioButton
            id="radio-10"
            labelText="Replication factor: 3"
            value="disabled"
          />
        </RadioButtonGroup>
      </div>
    </CreateFullPageStepPrototype>,
    <CreateFullPageStepPrototype
      key={1}
      title="Partition"
      subtitle="One or more partitions make up a topic. A partition is an ordered list
    of messages."
      description="Partitions are distributed across the brokers in order to increase the
    scalability of your topic. You can also use them to distribute
    messages across the members of a consumer group."
      hasForm={false}
      onNext={() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // Example usage of how to prevent the next step if some kind
            // of error occurred during the `onNext` handler.
            if (shouldReject) {
              setHasSubmitError(true);
              reject();
            }
            setIsInvalid(false);
            resolve();
          }, simulatedDelay);
        });
      }}
      disableSubmit={!textInput}>
      <Row>
        <Column xlg={5} lg={5} md={4} sm={4}>
          <FormGroup
            className={`${blockClass}__step-fieldset ${storyClass}__step-fieldset--label`}
            legendText="Partition">
            <TextInput
              id="test1"
              invalidText="A valid value is required"
              labelText="Topic name"
              placeholder="Enter topic name"
              onChange={(e) => {
                setTextInput(e.target.value);
                setIsInvalid(false);
              }}
              onBlur={() => {
                textInput.length === 0 && setIsInvalid(true);
              }}
              invalid={isInvalid}
            />
            {hasSubmitError && (
              <InlineNotification
                lowContrast
                kind="error"
                title="Error"
                subtitle="Resolve errors to continue"
                onClose={() => setHasSubmitError(false)}
              />
            )}
            <div>
              <Tooltip
                triggerClassName={`${storyClass}__tooltip`}
                direction="right"
                tabIndex={0}>
                <p>
                  Once toggled on, an inline error notification will appear upon
                  clicking next. This is an example usage of how to prevent the
                  next step if some kind of error occurred during the `onNext`
                  handler.
                </p>
              </Tooltip>
              <Toggle
                className={`${storyClass}__error--toggle`}
                id="simulated-error-toggle"
                size="sm"
                labelText="Simulate error"
                onToggle={(event) => setShouldReject(event)}
              />
            </div>
          </FormGroup>
        </Column>
      </Row>
      <span className={`${blockClass}__section-divider`} />
      <h5 className={`${blockClass}__step-title`}>Core configuration</h5>
      <h6 className={`${blockClass}__step-subtitle`}>
        This is how long messages are retained before they are deleted.
      </h6>
      <FormGroup
        className={`${blockClass}__step-fieldset ${storyClass}__step-fieldset--label`}
        legendText="Core configuration">
        <p className={`${blockClass}__step-description`}>
          If your messages are not read by a consumer within this time, they
          will be missed.
        </p>
        <Row>
          <Column xlg={5} lg={5} md={4} sm={4}>
            <TextInput
              id="input-2"
              invalidText="A valid value is required"
              labelText="Topic name (optional)"
              placeholder="Enter topic name"
            />
          </Column>
        </Row>
        <Row>
          <Column xlg={4} lg={4} md={2} sm={2}>
            <NumberInput
              id="tj-input-3"
              invalidText="Number is not valid"
              label="Label (optional)"
              max={100}
              min={0}
              step={10}
              value={0}
            />
            <NumberInput
              id="tj-input-4"
              invalidText="Number is not valid"
              label="Label (optional)"
              max={100}
              min={0}
              step={10}
              value={0}
            />
          </Column>
        </Row>
        <Row>
          <Column xlg={5} lg={5} md={4} sm={4}>
            <TextInput
              id="input-5"
              invalidText="A valid value is required"
              labelText="Minimum in-sync replicas (optional)"
              placeholder="Enter topic name"
            />
          </Column>
        </Row>
      </FormGroup>
    </CreateFullPageStepPrototype>,
    <CreateFullPageStepPrototype
      key={2}
      viewAllOnly
      title="Hidden"
      subtitle="One or more partitions make up a topic. A partition is an ordered list
    of messages."
      description="Partitions are distributed across the brokers in order to increase the
    scalability of your topic. You can also use them to distribute
    messages across the members of a consumer group."
      hasForm={false}
      onNext={() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // Example usage of how to prevent the next step if some kind
            // of error occurred during the `onNext` handler.
            if (shouldReject) {
              setHasSubmitError(true);
              reject();
            }
            setIsInvalid(false);
            resolve();
          }, simulatedDelay);
        });
      }}>
      <Row>
        <Column xlg={5} lg={5} md={4} sm={4}>
          <FormGroup
            className={`${blockClass}__step-fieldset ${storyClass}__step-fieldset--label`}
            legendText="Hidden">
            <TextInput
              id="test2"
              invalidText="A valid value is required"
              labelText="Topic name"
              placeholder="Enter topic name"
              onChange={(e) => {
                setSecondTextInput(e.target.value);
                setIsInvalid(false);
              }}
              onBlur={() => {
                secondTextInput.length === 0 && setIsInvalid2(true);
              }}
              invalid={isInvalid2}
            />
          </FormGroup>
        </Column>
      </Row>
    </CreateFullPageStepPrototype>,
    <CreateFullPageStepPrototype
      key={3}
      title="Message retention"
      subtitle="This is how many copies of a topic will be made for high availability"
      description="The partitions of each topic can be replicated across a configurable number of brokers."
      formLegendText="Replicas">
      <div>
        <RadioButtonGroup
          defaultSelected="standard"
          legend="Group Legend"
          name="radio-button-group"
          valueSelected="standard"
          orientation="vertical">
          <RadioButton
            id="radio-1"
            labelText="Replication factor: 1"
            value="standard"
          />
          <RadioButton
            id="radio-2"
            labelText="Replication factor: 2"
            value="default-selected"
          />
          <RadioButton
            id="radio-3"
            labelText="Replication factor: 3"
            value="disabled"
          />
        </RadioButtonGroup>
      </div>
    </CreateFullPageStepPrototype>,
    <CreateFullPageStepPrototype
      key={4}
      viewAllOnly
      title="Hidden step"
      subtitle="This is how many copies of a topic will be made for high availability"
      description="The partitions of each topic can be replicated across a configurable number of brokers."
      formLegendText="Replicas">
      <div>
        <RadioButtonGroup
          defaultSelected="default-selected"
          legend="Group Legend"
          name="radio-button-group-2"
          valueSelected="standard"
          orientation="vertical">
          <RadioButton
            id="radio-8"
            labelText="Replication factor: 1"
            value="standard"
          />
          <RadioButton
            id="radio-9"
            labelText="Replication factor: 2"
            value="default-selected"
          />
          <RadioButton
            id="radio-10"
            labelText="Replication factor: 3"
            value="disabled"
          />
        </RadioButtonGroup>
      </div>
    </CreateFullPageStepPrototype>
  ];

  return (
    <CreateFullPagePrototype
      {...args}
      className={`${blockClass}`}
      initialStep={textInput.length > 0 ? 2 : 1}>
      {children.map((child) => child)}
    </CreateFullPagePrototype>
  );
};

const TemplateWithStepTransitions = ({ ...args }) => {
  const [textInput, setTextInput] = useState('');
  const [secondTextInput, setSecondTextInput] = useState('');
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [shouldReject, setShouldReject] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isInvalid2, setIsInvalid2] = useState(false);
  const [simulatedDelay] = useState(750);

  const children = [
    <CreateFullPageStepPrototype
      key={1}
      title="Partition"
      subtitle="One or more partitions make up a topic. A partition is an ordered list
    of messages."
      description="Partitions are distributed across the brokers in order to increase the
    scalability of your topic. You can also use them to distribute
    messages across the members of a consumer group."
      hasForm={false}
      onNext={() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // Example usage of how to prevent the next step if some kind
            // of error occurred during the `onNext` handler.
            if (shouldReject) {
              setHasSubmitError(true);
              reject();
            }
            setIsInvalid(false);
            resolve();
          }, simulatedDelay);
        });
      }}
      disableSubmit={!textInput}>
      <Row>
        <Column xlg={5} lg={5} md={4} sm={4}>
          <FormGroup
            className={`${blockClass}__step-fieldset ${storyClass}__step-fieldset--label`}
            legendText="Partition">
            <TextInput
              id="test1"
              invalidText="A valid value is required"
              labelText="Topic name"
              placeholder="Enter topic name"
              onChange={(e) => {
                setTextInput(e.target.value);
                setIsInvalid(false);
              }}
              onBlur={() => {
                textInput.length === 0 && setIsInvalid(true);
              }}
              invalid={isInvalid}
            />
            {hasSubmitError && (
              <InlineNotification
                lowContrast
                kind="error"
                title="Error"
                subtitle="Resolve errors to continue"
                onClose={() => setHasSubmitError(false)}
              />
            )}
            <div>
              <Tooltip
                triggerClassName={`${storyClass}__tooltip`}
                direction="right"
                tabIndex={0}>
                <p>
                  Once toggled on, an inline error notification will appear upon
                  clicking next. This is an example usage of how to prevent the
                  next step if some kind of error occurred during the `onNext`
                  handler.
                </p>
              </Tooltip>
              <Toggle
                className={`${storyClass}__error--toggle`}
                id="simulated-error-toggle"
                size="sm"
                labelText="Simulate error"
                onToggle={(event) => setShouldReject(event)}
              />
            </div>
          </FormGroup>
        </Column>
      </Row>
      <span className={`${blockClass}__section-divider`} />
      <h5 className={`${blockClass}__step-title`}>Core configuration</h5>
      <h6 className={`${blockClass}__step-subtitle`}>
        This is how long messages are retained before they are deleted.
      </h6>
      <FormGroup
        className={`${blockClass}__step-fieldset ${storyClass}__step-fieldset--label`}
        legendText="Core configuration">
        <p className={`${blockClass}__step-description`}>
          If your messages are not read by a consumer within this time, they
          will be missed.
        </p>
        <Row>
          <Column xlg={5} lg={5} md={4} sm={4}>
            <TextInput
              id="input-2"
              invalidText="A valid value is required"
              labelText="Topic name (optional)"
              placeholder="Enter topic name"
            />
          </Column>
        </Row>
        <Row>
          <Column xlg={4} lg={4} md={2} sm={2}>
            <NumberInput
              id="tj-input-3"
              invalidText="Number is not valid"
              label="Label (optional)"
              max={100}
              min={0}
              step={10}
              value={0}
            />
            <NumberInput
              id="tj-input-4"
              invalidText="Number is not valid"
              label="Label (optional)"
              max={100}
              min={0}
              step={10}
              value={0}
            />
          </Column>
        </Row>
        <Row>
          <Column xlg={5} lg={5} md={4} sm={4}>
            <TextInput
              id="input-5"
              invalidText="A valid value is required"
              labelText="Minimum in-sync replicas (optional)"
              placeholder="Enter topic name"
            />
          </Column>
        </Row>
      </FormGroup>
    </CreateFullPageStepPrototype>,
    <CreateFullPageStepPrototype
      key={2}
      viewAllOnly
      title="Hidden"
      subtitle="One or more partitions make up a topic. A partition is an ordered list
    of messages."
      description="Partitions are distributed across the brokers in order to increase the
    scalability of your topic. You can also use them to distribute
    messages across the members of a consumer group."
      hasForm={false}
      onNext={() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // Example usage of how to prevent the next step if some kind
            // of error occurred during the `onNext` handler.
            if (shouldReject) {
              setHasSubmitError(true);
              reject();
            }
            setIsInvalid(false);
            resolve();
          }, simulatedDelay);
        });
      }}>
      <Row>
        <Column xlg={5} lg={5} md={4} sm={4}>
          <FormGroup
            className={`${blockClass}__step-fieldset ${storyClass}__step-fieldset--label`}
            legendText="Hidden">
            <TextInput
              id="test2"
              invalidText="A valid value is required"
              labelText="Topic name"
              placeholder="Enter topic name"
              onChange={(e) => {
                setSecondTextInput(e.target.value);
                setIsInvalid(false);
              }}
              onBlur={() => {
                secondTextInput.length === 0 && setIsInvalid2(true);
              }}
              invalid={isInvalid2}
            />
          </FormGroup>
        </Column>
      </Row>
    </CreateFullPageStepPrototype>,
    <CreateFullPageStepPrototype
      key={3}
      title="Message retention"
      subtitle="This is how many copies of a topic will be made for high availability"
      description="The partitions of each topic can be replicated across a configurable number of brokers."
      formLegendText="Replicas">
      <div>
        <RadioButtonGroup
          defaultSelected="standard"
          legend="Group Legend"
          name="radio-button-group"
          valueSelected="standard"
          orientation="vertical">
          <RadioButton
            id="radio-1"
            labelText="Replication factor: 1"
            value="standard"
          />
          <RadioButton
            id="radio-2"
            labelText="Replication factor: 2"
            value="default-selected"
          />
          <RadioButton
            id="radio-3"
            labelText="Replication factor: 3"
            value="disabled"
          />
        </RadioButtonGroup>
      </div>
    </CreateFullPageStepPrototype>,
    <CreateFullPageStepPrototype
      key={4}
      viewAllOnly
      title="Hidden step"
      subtitle="This is how many copies of a topic will be made for high availability"
      description="The partitions of each topic can be replicated across a configurable number of brokers."
      formLegendText="Replicas">
      <div>
        <RadioButtonGroup
          defaultSelected="default-selected"
          legend="Group Legend"
          name="radio-button-group-2"
          valueSelected="standard"
          orientation="vertical">
          <RadioButton
            id="radio-8"
            labelText="Replication factor: 1"
            value="standard"
          />
          <RadioButton
            id="radio-9"
            labelText="Replication factor: 2"
            value="default-selected"
          />
          <RadioButton
            id="radio-10"
            labelText="Replication factor: 3"
            value="disabled"
          />
        </RadioButtonGroup>
      </div>
    </CreateFullPageStepPrototype>,
  ];

  return (
    <CreateFullPagePrototype
      {...args}
      className={cx(`${blockClass}__progress-indicator`, "stepTransition")}
      initialStep={textInput.length > 0 ? 2 : 1}>
      {children.map((child) => child)}
    </CreateFullPagePrototype>
  );
};


export const createFullPageWithToggleToLastIncompleteStep = prepareStory(
  TemplateWithToggleLastInCompleteStep,
  {
    args: {
      ...defaultFullPageProps,
    },
  }
);

export const createFullPageWithToggleToStepOne = prepareStory(
  TemplateWithToggleStep1,
  {
    args: {
      ...defaultFullPageProps,
    },
  }
);

export const createFullPageWithManySteps = prepareStory(
  TemplateWithManySteps,
  {
    args: {
      ...defaultFullPageProps,
    },
  }
);

export const createFullPageWithStepTransitions = prepareStory(
  TemplateWithStepTransitions,
  {
    args: {
      ...defaultFullPageProps,
    },
  }
);