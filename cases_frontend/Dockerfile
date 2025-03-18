# Usar una imagen base de Node.js
FROM node:22 as build

# Definir build args
ARG VITE_TITLE
ARG VITE_CLIENT_ID
ARG VITE_AUTHORITY
ARG VITE_POPUP_REDIRECT_URI
ARG VITE_CASES_BACKEND_URL

# Establecer los argumentos de compilación como variables de entorno si no estan vacios
RUN if [ -n "$VITE_TITLE" ]; then echo "ENV VITE_TITLE=$VITE_TITLE" >> /etc/environment; fi
RUN if [ -n "$VITE_CLIENT_ID" ]; then echo "ENV VITE_CLIENT_ID=$VITE_CLIENT_ID" >> /etc/environment; fi
RUN if [ -n "$VITE_AUTHORITY" ]; then echo "ENV VITE_AUTHORITY=$VITE_AUTHORITY" >> /etc/environment; fi
RUN if [ -n "$VITE_POPUP_REDIRECT_URI" ]; then echo "ENV VITE_POPUP_REDIRECT_URI=$VITE_POPUP_REDIRECT_URI" >> /etc/environment; fi
RUN if [ -n "$VITE_CASES_BACKEND_URL" ]; then echo "ENV VITE_CASES_BACKEND_URL=$VITE_CASES_BACKEND_URL" >> /etc/environment; fi


# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios
COPY package*.json ./

# Eliminar node_modules y package-lock.json si existen
RUN rm -rf node_modules package-lock.json

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build

# Usar una imagen base de Node.js para servir la aplicación
FROM node:20-alpine

# Instalar 'serve' globalmente
RUN npm install -g serve

# Copiar los archivos construidos desde la etapa anterior
COPY --from=build /app/dist /app/dist

# Establecer el directorio de trabajo
WORKDIR /app

# Exponer el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Comando para servir la carpeta dist
CMD ["serve", "-s", "dist"]