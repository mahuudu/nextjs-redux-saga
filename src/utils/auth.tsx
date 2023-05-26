import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getCookie, deleteCookie } from 'cookies-next';


type AdditionalProps = {
  Layout: string;
  authorizedRoles?: string[];
};

const withAuthSync = <P extends object>(WrappedComponent: any) => {
  const Wrapper: any = (props : any) => {
    const router = useRouter();

    const user = getCookie('user', {});
    const isAuthenticated = getCookie('jwt_token', {});
    const userRoles = getCookie('userRoles', {}) as any;

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace('/login'); // Redirect to login page if not authenticated
      } else if (props.authorizedRoles && userRoles && !props.authorizedRoles.some((role : any) => userRoles.includes(role))) {
        router.replace('/unauthorized'); // Redirect to unauthorized page if the user doesn't have the required roles
      }
    }, [isAuthenticated, userRoles, router, props.authorizedRoles]);

    return <WrappedComponent {...props} />;
  };

  Wrapper.Layout = WrappedComponent.Layout;

  return Wrapper;
};

export default withAuthSync;
