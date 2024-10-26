import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import ClaimSubmissionForm from '../../components/forms/ClaimSubmissionForm';
import useSubmitClaim from '../../hooks/useSubmitClaim';

const ClaimSubmission = () => {
  const { submitClaim, loading } = useSubmitClaim();

  return (
    <View style={{ flex: 1 }}>
      {loading && <ActivityIndicator size="large" color="#007BFF" />}
      <ClaimSubmissionForm onSubmit={submitClaim} />
    </View>
  );
};

export default ClaimSubmission;
