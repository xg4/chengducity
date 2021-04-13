import { gql } from '@apollo/client';

export const pushMessage = gql`
  mutation pushMessage($data: PushMessageInputs!) {
    pushMessage(data: $data)
  }
`;
