<script>
  import { Boxes, Megaphone, Package, Truck, Users, PocketKnife } from "@lucide/svelte";
  import clarisseHeadLogo from "../assets/clarisse_head.png";

  const MENUS_GROUP = [
    {
      title: "Magasin",
      menus: [
        {
          title: "Articles",
          icon: Package,
          items: [
            { title: "Gestion", href: "/" }
          ]
        },
        {
          title: "Stocks",
          icon: Boxes,
          items: [
            { title: "Gestion", href: "/" }
          ]
        },
        {
          title: "Clients",
          icon: Users,
          items: [
            { title: "Gestion", href: "/" }
          ]
        },
        {
          title: "Commandes",
          icon: Truck,
          items: [
            { title: "Gestion", href: "/" }
          ]
        }
      ]
    },
    {
      title: "Réseau",
      menus: [
        {
          title: "Communication",
          icon: Megaphone,
          items: [
            { title: "Gestion", href: "/" }
          ]
        },
        {
          title: "Outils",
          icon: PocketKnife,
          items: [
            { title: "Gestion", href: "/" }
          ]
        }
      ]
    }
  ]
</script>

<aside class="flex flex-col w-64 bg-base-200">
  <header class="flex items-center gap-4 p-2">
    <div class="w-fit object-cover">
      <div class="p-2 bg-orange-100 rounded-full">
        <img class="w-6" src={clarisseHeadLogo} alt=""/>
      </div>
    </div>
    <span>Loches</span>
  </header>

  <nav class="w-full">
    {#each MENUS_GROUP as group, groupId (group.title)}
      <ul class="menu w-full">
        <li class="menu-title text-orange-500">{group.title}</li>

        {#each group.menus as menu, menuId (menu.title)}
          <li>
            <details open={groupId === 0 && menuId === 0}>
              <summary>
                <menu.icon class="h-[1.25em]"/>
                {menu.title}
              </summary>
              <ul>
                {#each menu.items as menuItems (menu)}
                  <li>
                    <a href={menuItems.href}>{menuItems.title}</a>
                  </li>
                {/each}
              </ul>
            </details>
          </li>
        {/each}
      </ul>
    {/each}
  </nav>

  <footer class="mt-auto">
    ACCOUNT
  </footer>
</aside>