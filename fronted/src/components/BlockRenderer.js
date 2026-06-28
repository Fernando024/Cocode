import componentMap from "./componentMap";

function groupConsecutive(blocks) {
  if (!blocks.length) return [];

  const groups = [];
  let currentGroup = { __component: blocks[0].__component, blocks: [blocks[0]] };

  for (let i = 1; i < blocks.length; i++) {
    if (blocks[i].__component === currentGroup.__component) {
      currentGroup.blocks.push(blocks[i]);
    } else {
      groups.push(currentGroup);
      currentGroup = { __component: blocks[i].__component, blocks: [blocks[i]] };
    }
  }
  groups.push(currentGroup);

  return groups;
}

export default function BlockRenderer({ bloques }) {
  if (!Array.isArray(bloques) || bloques.length === 0) return null;

  const agrupados = groupConsecutive(bloques);

  return (
    <>
      {agrupados.map((group, idx) => {
        const Component = componentMap[group.__component];
        if (!Component) {
          if (process.env.NODE_ENV !== "production") {
            console.warn(
              `[BlockRenderer] No hay componente registrado para "${group.__component}".`
            );
          }
          return null;
        }

        return (
          <Component
            key={idx}
            block={group.blocks.length === 1 ? group.blocks[0] : group.blocks}
          />
        );
      })}
    </>
  );
}
