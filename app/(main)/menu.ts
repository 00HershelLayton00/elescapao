export const MENU_DATA = [
    {
        id: "entradas",
        titulo: "Entrada",
        subcategorias: [
            {
                nombre: "Entrantes",
                productos: [
                    { nombre: "Croquetas de pescado", desc: "", precio: "$3000" ,rating:3.9},
                    { nombre: "Croquetas de Camarón", desc: "", precio: "$3000" },
                    { nombre: "Croqueta de Ahumada", desc: "", precio: "$3000" },
                    { nombre: "Croqueta de Queso", desc: "", precio: "$3000" },
                    { nombre: "Brochetas de Cerdo", desc: "", precio: "$3800" },
                    { nombre: "Brochetas de Pollo", desc: "", precio: "$3800" },
                    { nombre: "Brochetas de vegetales", desc: "", precio: "$3800" },
                    { nombre: "Albóndigas de Cerdo", desc: "100% Carne", precio: "$3000" },
                    { nombre: "Tira cervecera", desc: "Chorizo de cerdo hecho en casa", precio: "$3000" },
                    { nombre: "Ají Relleno", desc: "Pimiento relleno con carne de cerdo y gratinado con queso", precio: "$3000" },
                    { nombre: "Picada Escapa", desc: "Bolita de queso, brocheta, masa frita, chorizo, Croquetas, pizza napolitana", precio: "Consultar" }
                ]
            },
            {
                nombre: "Aperitivos",
                productos: [
                    { nombre: "Sopa del día de Res", desc: "", precio: "900" },
                    { nombre: "Sopa del día de Pollo", desc: "", precio: "900" },
                    { nombre: "Sopa del día de vegetales", desc: "", precio: "1000" },
                    { nombre: "Aguado de Pollo", desc: "Sopa de arroz", precio: "1000" },
                    { nombre: "Caldo Gallego", desc: "Garvanzo y Chorizo", precio: "Consultar" },
                    { nombre: "Potaje de frijol negro/rojo", desc: "", precio: "1000" },
                    { nombre: "Ajiaco", desc: "", precio: "1000" }
                ]
            }
        ]
    },
    {
        id: "ensaladas",
        titulo: "Ensaladas",
        subcategorias: [
            {
                nombre: "Ensaladas",
                productos: [
                    { nombre: "Mixta", desc: "Vegetales de Estación", precio: "$900" },
                    { nombre: "Pimientos Asados", desc: "", precio: "$900" },
                    { nombre: "Remolacha", desc: "", precio: "$800" },
                    { nombre: "Salteados de Vegetales", desc: "", precio: "$1000" },
                    { nombre: "Ensalada Escapá", desc: "Pollo/col/zanahoria/vinagreta de la casa/queso al gusto", precio: "$3500" }
                ]
            }
        ]
    },
    {
        id: "principales",
        titulo: "Principal",
        subcategorias: [
            {
                nombre: "Plato Fuerte de Cerdo",
                productos: [
                    { nombre: "Bistec Encebollado", desc: "", precio: "$3800" },
                    { nombre: "Bistec Natural", desc: "", precio: "$3000" },
                    { nombre: "Oreja de Elefante", desc: "1lb de carne de cerdo empanizado y gratinado con queso", precio: "$4800" },
                    { nombre: "Cerdo campesino", desc: "1lb de carne de cerdo empanizado y relleno con pollo, vegetales y gratinado con queso", precio: "$4900" },
                    { nombre: "Costilla Escapá", desc: "4lb de costilla asada y terminada al carbón/casabe/guarnición de presentación", precio: "$9000" },
                    { nombre: "Lonjas de cerdo criolla", desc: "", precio: "$3800" },
                    { nombre: "Lonjas de cerdo ahumado", desc: "", precio: "$3900" },
                    { nombre: "Fajitas de Cerdo Natural con Vegetales", desc: "", precio: "$3000" },
                    { nombre: "Fajitas de Cerdo Natural", desc: "", precio: "$3000" },
                    { nombre: "Pernil de cerdo asado", desc: "Preguntar al mesero", precio: "S/M" },
                    { nombre: "Fricasé de cerdo", desc: "", precio: "$3800" },
                    { nombre: "Cerdo asado entero", desc: "Bajo pedido", precio: "$" },
                    { nombre: "Chuleta Criolla/2lb al carbón", desc: "Cebolla/gratinada con queso/vegetales salteados", precio: "$4000" },
                    { nombre: "Masas de Cerdo Frita", desc: "Doradas/secas", precio: "$3000" },
                    { nombre: "Escapá", desc: "Con cebolla", precio: "$3600" },
                    { nombre: "Braba", desc: "Salsa roja/vegetales/picante", precio: "$3800" }
                ]
            },
            {
                nombre: "Plato Fuerte de Cordero",
                productos: [
                    { nombre: "Cordero al Corte en su salsa", desc: "Sellado al carbón y cocinado en cerveza más agregados secretos", precio: "$4800" },
                    { nombre: "Pierna de Cordero al carbón", desc: "Salsa roja/vegetales/picante", precio: "$8000" },
                    { nombre: "Costilla de Ovejo al carbón", desc: "Salsa roja/vegetales/picante", precio: "Consultar" }
                ]
            },
            {
                nombre: "Plato Fuerte de Pollo",
                productos: [
                    { nombre: "Bistec de Pollo Natural", desc: "", precio: "$3000" },
                    { nombre: "Bistec de Pollo encebollado", desc: "", precio: "$3200" },
                    { nombre: "Bistec de Pollo empanizado", desc: "", precio: "$3800" },
                    { nombre: "1/4 de Pollo asado/frito", desc: "", precio: "$3200" },
                    { nombre: "Pollo Escapao", desc: "Asado con vegetales salteados y gratinado con queso", precio: "$4000" }
                ]
            },
            {
                nombre: "Plato Fuerte de Res",
                productos: [
                    { nombre: "Bistec con Cebolla", desc: "", precio: "Consultar" },
                    { nombre: "Ropa vieja", desc: "Carne de res desmenuzada en salsa de tomate", precio: "Consultar" },
                    { nombre: "Vaca frita", desc: "Carne en hilachas fritas con cebolla", precio: "Consultar" }
                ]
            },
            {
                nombre: "Plato Fuerte de Camarón",
                productos: [
                    { nombre: "Ceviche", desc: "Pico de gallo/cerveza. Se sirve frío", precio: "$4000" },
                    { nombre: "Coctel", desc: "Base de mayonesa", precio: "$3000" },
                    { nombre: "Rebosado", desc: "", precio: "$3600" },
                    { nombre: "Al ajillo", desc: "", precio: "$4000" },
                    { nombre: "Enchilado", desc: "", precio: "$4000" }
                ]
            }
        ]
    },
    {
        id: "variedades",
        titulo: "Variedades",
        subcategorias: [
            {
                nombre: "Hamburguesas",
                productos: [
                    { nombre: "Hamburguesa San Pepper S", desc: "Libra de carne de cerdo/queso/salsas/tomate/lechuga/cebolla", precio: "$3900" }
                ]
            },
            {
                nombre: "Pizzas",
                productos: [
                    { nombre: "Pizza Napolitana", desc: "", precio: "$2800" },
                    { nombre: "Pizza Escapá", desc: "Carne de cerdo asado/chorizo/vegetales", precio: "$3800" },
                    { nombre: "Pizza Nostra", desc: "Carne molida/salsa roja/queso/cebolla", precio: "$3000" }
                ]
            },
            {
                nombre: "Paellas",
                productos: [
                    { nombre: "Paella Campesina", desc: "Cerdo/pollo", precio: "Consultar" },
                    { nombre: "Paella Mar/Tierra", desc: "Cerdo/pollo/camarón", precio: "Consultar" }
                ]
            }
        ]
    },
    {
        id: "guarniciones",
        titulo: "Guarnición",
        subcategorias: [
            {
                nombre: "Guarniciones",
                productos: [
                    { nombre: "Arroz blanco", desc: "", precio: "$600" },
                    { nombre: "Arroz frito", desc: "", precio: "$3000/3600" },
                    { nombre: "Congrí", desc: "Frijol negro", precio: "$800" },
                    { nombre: "Arroz con Maíz", desc: "", precio: "$1000" },
                    { nombre: "Arroz con Vegetales", desc: "", precio: "$1900" },
                    { nombre: "Arroz con Camarón", desc: "", precio: "$2900" },
                    { nombre: "Arroz con cerdo", desc: "", precio: "$1500" }
                ]
            },
            {
                nombre: "Viandas Fritas",
                productos: [
                    { nombre: "Patacón", desc: "", precio: "$900" },
                    { nombre: "Chifles", desc: "", precio: "$900" },
                    { nombre: "Boniato", desc: "", precio: "$900" },
                    { nombre: "Maduro", desc: "", precio: "$900" }
                ]
            },
            {
                nombre: "Viandas Hervidas",
                productos: [
                    { nombre: "Boniato", desc: "", precio: "$700" },
                    { nombre: "Fufú de plátano", desc: "", precio: "$900" },
                    { nombre: "Yuca con mojo", desc: "", precio: "$800" },
                    { nombre: "Calabaza", desc: "", precio: "$700" },
                    { nombre: "Plátano troceado", desc: "", precio: "$800" },
                    { nombre: "Matajíbaro", desc: "Plátano verde frito y mojado con chicharrón", precio: "$1100" }
                ]
            }
        ]
    },
    {
        id: "postres",
        titulo: "Postre",
        subcategorias: [
            {
                nombre: "Postres",
                productos: [
                    { nombre: "Flan de leche", desc: "", precio: "$750" },
                    { nombre: "Tres leches", desc: "", precio: "$1000" },
                    { nombre: "Postre de la casa", desc: "", precio: "Consultar" }
                ]
            }
        ]
    },
    {
        id: "vip",
        titulo: "VIP",
        subcategorias: [
            {
                nombre: "VIP",
                productos: [
                    { nombre: "Ensalada César", desc: "Pollo, lechuga, parmesano", precio: "$12.99" },
                    { nombre: "Risotto de Hongos", desc: "Arroz arbóreo, hongos", precio: "$18.99" },
                    { nombre: "Brownie con Helado", desc: "Chocolate caliente con helado", precio: "$7.99" },
                    { nombre: "Limonada Natural", desc: "Fresca con hierbabuena", precio: "$4.99" },
                    { nombre: "Pizza Margarita", desc: "Salsa de tomate, mozzarella, albahaca", precio: "$14.99" },
                    { nombre: "Tiramisú", desc: "Postre italiano con café", precio: "$6.99" }
                ]
            }
        ]
    },
    {
        id: "viandas",
        titulo: "Viandas",
        subcategorias: [
            {
                nombre: "Viandas Fritas",
                productos: [
                    { nombre: "Patacon", desc: "", precio: "$900" },
                    { nombre: "Chifles", desc: "", precio: "$900" },
                    { nombre: "Boniato", desc: "", precio: "$900" },
                    { nombre: "Maduro", desc: "", precio: "$900" }
                ]
            },
            {
                nombre: "Viandas Hervidas",
                productos: [
                    { nombre: "Boniato", desc: "", precio: "$700" },
                    { nombre: "Fufu de plátano", desc: "", precio: "$900" },
                    { nombre: "Yuca con mojo", desc: "", precio: "$800" },
                    { nombre: "Calabaza", desc: "", precio: "$700" },
                    { nombre: "Plátano troceado", desc: "", precio: "$800" },
                    { nombre: "Matajíbaro", desc: "Plátano verde frito y mojado con chicharrón y agua al gusto", precio: "$1100" }
                ]
            }
        ]
    },
    {
        id: "parrillada",
        titulo: "Parrillada",
        subcategorias: [
            {
                nombre: "Parrillada",
                productos: [
                    { nombre: "Mixta", desc: "Chuleta/ pollo/ ahumado/ chorizo/ brocheta/ salteado de vegetales/ vianda frita", precio: "9500" },
                    { nombre: "Montada", desc: "Bistec/ chorizo/ ahumado/ huevo/ vegetales salteados/ viandas frita/ salsa roja", precio: "" },
                    { nombre: "Cordero", desc: "Pierna de cordero al carbón con salsa roja", precio: "" }
                ]
            }
        ]
    }
];