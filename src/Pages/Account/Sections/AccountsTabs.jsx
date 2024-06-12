import React from "react";
import Container from "Components/Container/Container";

const AccountsTabs = ({ onSelectingTabs, activeTabs }) => {
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
    },
  ];
  return (
    <section className="lg:pt-primary">
      <Container>
        {/* <div>
          <h1 className="text-4xl rb-bold lg:text-center">User Name</h1>
        </div> */}

        <div className="bg-dark text-white flex lg:items-center lg:justify-center   gap-x-16 my-10 lg:mt-14 overflow-scroll lg:overflow-hidden">
          {accountTabs.map(({ id, name }, index) => (
            <button
              onClick={() => onSelectingTabs(id)}
              className={`rb-bold min-w-[200px] lg:min-w-[auto] uppercase text-sm  py-4 px-8 transition ease-in duration ${
                activeTabs === id ? "bg-white text-primary underline " : ""
              }`}
              key={index}
            >
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
