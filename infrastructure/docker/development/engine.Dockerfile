FROM rust:1.75
WORKDIR /app
COPY ./apps/engine ./
RUN cargo build --release
EXPOSE 8080
CMD ["./target/release/engine"]