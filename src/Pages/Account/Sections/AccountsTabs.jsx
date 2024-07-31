import { useContext } from "react";
import Spinner from "Components/RequestHandler/Spinner";
import { UserLoginContext } from "context/Auth/UserLoginContext";

import Container from "Components/Container/Container";

const AccountsTabs = ({ onSelectingTabs, activeTabs }) => {
  const { handleUserLogout, userLoading, userData } =
    useContext(UserLoginContext);

  const accountTabs = [
    {
      id: 1,
      name: "Edit account",
    },
    {
      id: 2,
      name: "Order History",
    },
    {
      id: 3,
      name: "Address Book",
    },
    {
      id: 4,
      name: "My Wishlist",
    },
    {
      id: 5,
      name: "Logout",
      button: true,
    },
  ];
  return (
    <section className="pt-secondary lg:pt-primary">
      <Container>
        <div>
          <h1 className="text-4xl rb-bold lg:text-center">
            Hello {userData?.username}
          </h1>
        </div>

        <div className="bg-dark text-white flex lg:items-center lg:justify-center   gap-x-16 my-10 lg:mt-14 overflow-scroll lg:overflow-hidden">
          {accountTabs.map(({ id, name, button }, index) => (
            <button
              onClick={() =>
                button ? handleUserLogout() : onSelectingTabs(id)
              }
              className={`rb-bold min-w-[200px] lg:min-w-[auto] uppercase text-sm  py-4 px-8 transition ease-in duration flex items-center gap-x-2 ${
                activeTabs === id ? "bg-white text-primary underline " : ""
              }`}
              key={index}
            >
              {button && userLoading && <Spinner isSmall={true} />}

              {name}
            </button>
          ))}
        </div>
      </Container>
    </section>
    // <section className="lg:pt-primary">
    //   <Container>
    //     {/* <div>
    //       <h1 className="text-4xl rb-bold lg:text-center">User Name</h1>
    //     </div> */}

    //     <div className="bg-dark text-white flex  items-center justify-center gap-x-16 my-10 lg:mt-14">
    //       {accountTabs.map(({ id, name }, index) => (
    //         <button
    //           onClick={() => onSelectingTabs(id)}
    //           className={`rb-bold uppercase text-sm  py-4 px-8 transition ease-in duration ${
    //             activeTabs === id ? "bg-white text-primary underline " : ""
    //           }`}
    //           key={index}
    //         >
    //           {name}
    //         </button>
    //       ))}
    //     </div>
    //   </Container>
    // </section>
  );
};

export default AccountsTabs;
