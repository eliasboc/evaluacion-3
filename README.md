# 📅 Sistema de Gestión de Eventos Académicos

Una aplicación descentralizada (dApp) para la gestión transparente de eventos académicos, construida sobre la blockchain de Ethereum. Este sistema permite crear, gestionar y registrar participantes en eventos de manera inmutable y descentralizada.

## 🎯 Descripción del Proyecto

Este proyecto es una plataforma Web3 que facilita la administración de eventos académicos utilizando smart contracts. Los organizadores pueden crear eventos, los participantes pueden registrarse, y el sistema mantiene un registro inmutable de todas las inscripciones y asistencias confirmadas en la blockchain.

### Características Principales

- ✅ **Creación de Eventos**: Los administradores pueden crear eventos con nombre, descripción, fecha y capacidad máxima
- 👥 **Registro de Participantes**: Los usuarios pueden inscribirse en eventos activos directamente desde la dApp
- 📊 **Dashboard en Tiempo Real**: Visualización de estadísticas de eventos activos, próximos eventos y total de registros
- 🔐 **Validación de Asistencia**: Sistema de confirmación de asistencia controlado por el propietario del contrato
- 🎫 **Certificados de Participación**: Registro inmutable de asistencias confirmadas en la blockchain
- 🔄 **Hot Reload**: La interfaz se actualiza automáticamente al modificar el smart contract

## 🏗 Stack Tecnológico

- **Frontend**: Next.js 14 (App Router), React, TypeScript, TailwindCSS, DaisyUI
- **Smart Contracts**: Solidity ^0.8.0, OpenZeppelin (Ownable)
- **Blockchain Tools**: Hardhat, Wagmi, Viem
- **Web3 Integration**: RainbowKit para conexión de wallets

## 📋 Smart Contract

El contrato `EventManager.sol` es el núcleo de la aplicación y maneja toda la lógica de gestión de eventos.

### Estructura del Contrato

```solidity
struct Event {
    uint256 id;
    string name;
    string description;
    uint256 date;
    uint256 maxCapacity;
    uint256 registeredCount;
    bool isActive;
}
```

### Funciones Principales

- **`createEvent()`**: Permite al owner crear nuevos eventos académicos
- **`register(uint256 _eventId)`**: Permite a los usuarios registrarse en un evento
- **`getParticipants(uint256 _eventId)`**: Obtiene la lista de participantes registrados
- **`validateAttendance(uint256 _eventId, address _participant)`**: El owner confirma la asistencia
- **`hasCertificate(uint256 _eventId, address _participant)`**: Verifica si un participante tiene certificado
- **`getAllEvents()`**: Retorna todos los eventos creados

### Características de Seguridad

- Control de acceso con `Ownable` de OpenZeppelin
- Validaciones con custom errors para gas efficiency
- Prevención de doble registro
- Control de capacidad máxima de eventos
- El owner no puede registrarse como participante

## 🚀 Inicio Rápido

### Requisitos Previos

- [Node.js](https://nodejs.org/) (>= v20.18.3)
- [Yarn](https://yarnpkg.com/) (v1 o v2+)
- [Git](https://git-scm.com/)
- Una wallet de Ethereum (MetaMask recomendado)

### Instalación

1. Clona el repositorio:

```bash
git clone <repository-url>
cd gestion-eventos
```

2. Instala las dependencias:

```bash
yarn install
```

3. Inicia la red local de Hardhat:

```bash
yarn chain
```

4. En otra terminal, despliega el contrato:

```bash
yarn deploy
```

1. En una tercera terminal, inicia la aplicación:

```bash
yarn start
```

1. Abre tu navegador en `http://localhost:3000`

## 📁 Estructura del Proyecto

```text
gestion-eventos/
├── packages/
│   ├── hardhat/
│   │   ├── contracts/
│   │   │   └── EventManager.sol      # Smart contract principal
│   │   ├── deploy/
│   │   │   └── 00_deploy_your_contract.ts
│   │   └── hardhat.config.ts
│   └── nextjs/
│       ├── app/
│       │   └── page.tsx              # Página principal
│       ├── components/
│       │   ├── EventCard.tsx         # Componente de tarjeta de evento
│       │   └── ModalList.tsx         # Modal para listar participantes
│       └── scaffold.config.ts
└── README.md
```

## 🧪 Testing

Ejecuta los tests del smart contract:

```bash
yarn hardhat:test
```

Ejecuta el linter:

```bash
yarn lint
```

## 🚀 Contrato Desplegado

El smart contract `EventManager` está desplegado en la red de prueba **Sepolia**.

**Dirección del Contrato:**

```text
0x6634B8e1D363eFb7074Ff97cE62241Cdd759aD18
```

**Ver en Block Explorer:**

- [Ver contrato en Sepolia Etherscan](https://sepolia.etherscan.io/address/0x6634B8e1D363eFb7074Ff97cE62241Cdd759aD18)

Puedes interactuar con el contrato desplegado directamente desde la aplicación conectando tu wallet a la red Sepolia.

## 🌐 Despliegue

Para desplegar en una red de prueba o mainnet:

1. Configura tus variables de entorno en `packages/hardhat/.env`
2. Modifica `hardhat.config.ts` con la red deseada
3. Ejecuta:

```bash
yarn deploy --network <network-name>
```

## 📝 Uso de la Aplicación

### Como Administrador

1. Conecta tu wallet (debe ser la cuenta owner del contrato)
2. Usa la interfaz "Debug Contracts" para crear nuevos eventos
3. Valida asistencias de participantes registrados

### Como Participante

1. Conecta tu wallet
2. Navega por los eventos disponibles
3. Haz clic en "Registrarse" en el evento deseado
4. Confirma la transacción en tu wallet
5. Visualiza la lista de participantes registrados

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🔗 Enlaces Útiles

- [Documentación de Scaffold-ETH 2](https://docs.scaffoldeth.io)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Next.js Documentation](https://nextjs.org/docs)
