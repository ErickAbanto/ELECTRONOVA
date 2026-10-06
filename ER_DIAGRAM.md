# Diagrama Entidad-Relación (ER) - Electrónova

A continuación se muestra el modelo de datos utilizado por la aplicación (implementado en MongoDB con Mongoose).

```mermaid
erDiagram
    ADMINISTRADOR {
        ObjectId _id PK
        String nombre
        String correo
        String telefono
        String contrasena
        String token
        Boolean validacion
    }

    CATEGORIA {
        ObjectId _id PK
        String nombre
        String descripcion
    }

    PRODUCTO {
        ObjectId _id PK
        String nombre
        Boolean productoDestacado
        String especificacionesTec
        Date fechaRegistro
        Date fechaActualizacion
        Boolean estado
        Number precio
        String caracteristicas
        String descripcionCorta
        String descripcionCompleta
        ObjectId idCategoria FK
        ObjectId idAdministrador FK
    }

    IMAGEN {
        ObjectId _id PK
        String nombre
        String ubicacion
        ObjectId idProducto FK
    }

    EMPRESA {
        ObjectId _id PK
        String nombre
        String descripcion
        String direccion
        String horarioAtencion
        String redesSociales
        String contacto
        ObjectId idAdministrador FK
    }

    CATEGORIA ||--o{ PRODUCTO : "contiene"
    ADMINISTRADOR ||--o{ PRODUCTO : "gestiona"
    ADMINISTRADOR ||--o{ EMPRESA : "administra"
    PRODUCTO ||--o{ IMAGEN : "tiene"
```

## Entidades Principales

- **Administrador**: Usuarios con acceso al panel de administración.
- **Categoria**: Clasificación de los productos.
- **Producto**: Información detallada de los artículos en venta.
- **Imagen**: Referencias a las imágenes subidas de los productos.
- **Empresa**: Información estática o de configuración del sitio.

## Relaciones

- Una **Categoria** puede tener múltiples **Productos** (`1:N`).
- Un **Administrador** puede gestionar (registrar) múltiples **Productos** (`1:N`).
- Un **Producto** puede tener múltiples **Imágenes** (`1:N`).
