import React from 'react';
import { UserT } from '../../types/types';

type MyPageProps = {
  userInfo: UserT | undefined;
}

const MyPage = ({userInfo}: MyPageProps) => {
  return (
    <div>MyPage</div>
  )
}

export default MyPage;