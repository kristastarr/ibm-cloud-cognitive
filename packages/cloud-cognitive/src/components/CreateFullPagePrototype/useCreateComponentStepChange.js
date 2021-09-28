/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useCallback, useEffect } from 'react';

export const useCreateComponentStepChange = ({
  setCurrentStep,
  setAdvancedCurrentStep,
  setIsSubmitting,
  setShouldViewAll,
  onClose,
  onRequestSubmit,
  componentName,
  getComponentSteps,
  currentStep,
  advancedCurrentStep,
  shouldViewAll,
  backButtonText,
  cancelButtonText,
  submitButtonText,
  nextButtonText,
  isSubmitting,
  componentBlockClass,
  setCreateComponentActions,
  setModalIsOpen,
}) => {
  // useEffect to handle multi step logic
  useEffect(() => {
    const onUnmount = () => {
      if (componentName !== 'CreateFullPagePrototype') {
        setCurrentStep(0);
      }
      setIsSubmitting(false);
      setShouldViewAll(false);
      onClose();
    };
    const handleOnRequestSubmit = async () => {
      // check if onRequestSubmit returns a promise
      try {
        await onRequestSubmit();
        onUnmount();
      } catch (error) {
        setIsSubmitting(false);
        console.warn(`${componentName} submit error: ${error}`);
      }
    };
    const isSubmitDisabled = () => {
      let step = 0;
      let submitDisabled = false;
      let viewAllSubmitDisabled = false;
      const createComponentSteps = displayCorrectSteps();
      createComponentSteps.forEach((child) => {
        step++;
        if (shouldViewAll) {
          if (advancedCurrentStep === step) {
            submitDisabled = child.props.disableSubmit;
          }
          if (shouldViewAll && child.props.disableSubmit) {
            viewAllSubmitDisabled = true;
          }
        } else {
          if (currentStep === step) {
            submitDisabled = child.props.disableSubmit;
          }
          if (shouldViewAll && child.props.disableSubmit) {
            viewAllSubmitDisabled = true;
          }
        }
      });
      if (!shouldViewAll) {
        return submitDisabled;
      }
      return viewAllSubmitDisabled;
    };
    const handleNext = async () => {
      setIsSubmitting(true);
      const createSteps = displayCorrectSteps();
      if (createSteps[currentStep - 1].props.onNext) {
        try {
          await createSteps[currentStep - 1].props.onNext();
          continueToNextStep();
        } catch (error) {
          setIsSubmitting(false);
          console.warn(`${componentName} onNext error: ${error}`);
        }
      } else {
        continueToNextStep();
      }
    };
    const handleSubmit = async () => {
      setIsSubmitting(true);
      const createSteps = displayCorrectSteps();
      // last step should have onNext as well
      if (createSteps[currentStep - 1].props.onNext) {
        try {
          await createSteps[currentStep - 1].props.onNext();
          await handleOnRequestSubmit();
        } catch (error) {
          setIsSubmitting(false);
          console.warn(`${componentName} onNext error: ${error}`);
        }
      } else {
        await handleOnRequestSubmit();
      }
    };
    const displayCorrectSteps = () => {
      let steps = shouldViewAll
        ? getComponentSteps()
        : getComponentSteps().filter((step) => !step.props.viewAllOnly);
      return steps;
    };

    if (displayCorrectSteps()?.length) {
      const createSteps = displayCorrectSteps();
   
      // createSteps.map((step) => console.log(step.props.viewAllOnly ?? step.props.viewOnly == true));
      // console.log(newSteps)

      let newSteps = createSteps.filter((step) => step.props.viewAllOnly ?? step.props.viewOnly == true);
     newSteps.map((step) => console.log(step))

      const total = createSteps.length;
      const buttons = [];
      buttons.push({
        key: 'create-action-button-back',
        label: backButtonText,
        onClick: () =>
          shouldViewAll
            ? setAdvancedCurrentStep((prev) => prev - 1)
            : setCurrentStep((prev) => prev - 1),
        kind: 'secondary',
        disabled: shouldViewAll ? advancedCurrentStep === 1 : currentStep === 1,
      });
      buttons.push({
        key: 'create-action-button-cancel',
        label: cancelButtonText,
        onClick:
          componentName === 'CreateFullPagePrototype'
            ? () => setModalIsOpen(true)
            : onUnmount,
        kind: 'ghost',
      });
      buttons.push({
        key: 'create-action-button-submit',
        label: shouldViewAll
          ? advancedCurrentStep < total
            ? nextButtonText
            : submitButtonText
          : currentStep < total
          ? nextButtonText
          : submitButtonText,
        onClick: shouldViewAll
          ? advancedCurrentStep < total
            ? handleNext
            : handleSubmit
          : currentStep < total
          ? handleNext
          : handleSubmit,
        disabled: isSubmitDisabled(),
        kind: 'primary',
        loading: isSubmitting,
        className: `${componentBlockClass}__create-button`,
      });
      setCreateComponentActions(buttons);
    }
  }, [
    getComponentSteps,
    backButtonText,
    cancelButtonText,
    currentStep,
    onClose,
    nextButtonText,
    submitButtonText,
    onRequestSubmit,
    isSubmitting,
    shouldViewAll,
    componentBlockClass,
    componentName,
    continueToNextStep,
    setCurrentStep,
    setCreateComponentActions,
    setIsSubmitting,
    setShouldViewAll,
    setModalIsOpen,
    advancedCurrentStep,
    setAdvancedCurrentStep,
  ]);

  const continueToNextStep = useCallback(() => {
    setIsSubmitting(false);
    if (shouldViewAll === true) {
      setAdvancedCurrentStep((prev) => prev + 1);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  }, [setCurrentStep, setIsSubmitting, shouldViewAll, setAdvancedCurrentStep]);
};
