import useLinkStore from "../contexts/LinksStore";
import Button from "../ui/Button";

const Dashboard = () => {
  const { links, add, remove } = useLinkStore();

  return (
    <>
      <h1>Dash</h1>
      {links &&
        links.map((link, index) => (
          <div key={index}>
            <h1>{link.id}</h1>
          </div>
        ))}
      <Button
        onClick={() => {
          add({
            id: "123",
            origen: "123",
            destino: "123",
            idUser: "123",
            status: true,
            description: "123",
            nClicks: 3,
            creationDate: new Date(),
          });
        }}
      >
        Add
      </Button>
      <Button onClick={() => {}}>Remove</Button>
    </>
  );
};

export default Dashboard;
